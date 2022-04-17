import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import * as aws from './aws.js'

const app = express()
app.use(cors())
app.use(express.json({ limit: '50mb' }))

app.get('/', (req, res) => res.send('hello'))

app.get('/upload-url', async (req, res) => {
  const s3Url = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.MY_AWS_REGION}.amazonaws.com`
  const { file, type } = req.query
  const url = aws.getUploadUrl(file)
  await aws.createImage(`${s3Url}/${file}`, type)

  res.status(200).json({
    url,
  })
})

app.get('/gurkor', async (req, res) => {
  const gurkor = await aws.getGurkor()
  const images = await aws.getImages()

  res.status(200).json(
    gurkor.map((gurk) => {
      gurk.images = images
      return gurk
    })
  )
})

app.listen(4000, () => console.log('listening on port 4000'))
