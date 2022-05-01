import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import * as aws from './aws.js'
import { Server } from 'socket.io'
import { createServer } from 'http'
import { v4 as uniqueId } from 'uuid'
import { point, greatCircle } from '@turf/turf'

const app = express()
const http = createServer(app)

app.use(cors())
app.use(express.json({ limit: '50mb' }))

app.get('/', (req, res) => res.send('hello'))

app.get('/upload-url', async (req, res) => {
  const s3Url = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.MY_AWS_REGION}.amazonaws.com`
  const { file, gurka } = req.query
  const url = aws.getUploadUrl(file)
  await aws.createImage(`${s3Url}/${file}`, gurka)

  res.status(200).json({
    url,
  })
})

app.get('/gurkor', async (req, res) => {
  const gurkor = await aws.getGurkor()
  const gurkorWithImages = await Promise.all(
    gurkor.map(async (g) => {
      const images = await aws.getImages(g.name)
      return {
        ...g,
        images,
      }
    })
  )

  res.status(200).json(gurkorWithImages)
})

app.listen(4000, () => console.log('listening on port 4000'))

const io = new Server(http, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
})

http.listen(4001)
let connections = []
io.on('connection', (socket) => {
  connections.push(socket.id)
  io.to(socket.id).emit(
    'visitors',
    connections.filter((id) => id !== socket.id)
  )
  socket.broadcast.emit('visitor', socket.id)

  socket.on('disconnect', () => {
    connections = connections.filter((c) => c !== socket.id)
    io.emit('visitor-disconnect', socket.id)
  })
  socket.on('activated', () => {
    socket.broadcast.emit('visitor', socket.id)
    socket.emit(
      'visitors',
      connections.filter((id) => id !== socket.id)
    )
  })
  socket.on('deactivated', () => {
    io.emit('visitor-disconnect', socket.id)
  })

  socket.on('pos', ({ pos, rotation }) => {
    socket.broadcast.emit('pos', { id: socket.id, pos, rotation })
  })
})

// const randPos = () => [-10 + Math.random() * 20, -10 + Math.random() * 20]

// const simulateVisitor = (id, start = [0, 0]) => {
//   const end = randPos()
//   var points = greatCircle(start, end, { npoints: 5 }).geometry.coordinates
//   for (let i = 0; i < points.length - 1; i++) {
//     setTimeout(() => {
//       io.emit('pos', {
//         id,
//         pos: [points[i][0], 1, points[i][1]],
//         rotation: [Math.random(), Math.random(), Math.random()],
//       })
//       if (i === points.length - 2) {
//         simulateVisitor(id, end)
//       }
//     }, i * 1000)
//   }
// }

// const simulateVisitors = (count = 250) => {
//   for (let i = 0; i < count; i++) {
//     setTimeout(() => {
//       const id = uniqueId()
//       io.emit('visitor', id)
//       simulateVisitor(id)
//     }, i * 100)
//   }
// }

// app.get('/simulate', (req, res) => {
//   simulateVisitors()
//   res.send('ok')
// })
