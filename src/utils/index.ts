import '@tensorflow/tfjs-backend-webgl'
import * as blazeface from '@tensorflow-models/blazeface'

export const validate = async (file: any) => {
  const model = await blazeface.load()
  const predictions = await model.estimateFaces(file, false)

  console.log(predictions)

  return true
}
