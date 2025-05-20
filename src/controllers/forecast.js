import { asyncMiddleware } from '../middlewares'
import { Forecast } from '../models/Forecast'

export const CONTROLLER_FORECAST = {
  create: asyncMiddleware(async (req, res) => {
    try {
      const { userId, date, dateFlag, data } = req.body
      const existingForecast = await Forecast.findOne({ userId, date })
      if (existingForecast) {
        let tempData ;
        let missing = []
        data.forEach(element => {
          let flag = true;
          tempData = existingForecast.data.map(item => {
            if(item[1] === element[1]) {
              item[3] = element[3];
              flag = false;
              return item
            }
            return item
          })
          //missing element
          if(flag === true) {
            missing.push(element)
          }
        });
        const result = [...tempData, ...missing]
        await existingForecast.updateOne({$set:{data:result}})
        return res.status(201).json(existingForecast.toObject())
      }
      else {
        const forecast = new Forecast({
          userId: userId,
          date: date,
          dateFlag: dateFlag,
          data: data
        })
        const savedForecast = await forecast.save()
        return res.status(201).json(savedForecast.toObject())
      }
    } catch (error) {
      return res.status(500).json({ message: 'Server error', error: error.message })
    }
  }),

  update: asyncMiddleware(async (req, res) => {
    try {
      const { userId, date, dateFlag, data } = req.body
      const existingForecast = await Forecast.findOne({ userId, date })
      if (existingForecast) {
        let tempData ;
        let missing = []
        data.forEach(element => {
          let flag = true;
          tempData = existingForecast.data.map(item => {
            if(item[1] === element[1]) {
              item[4] = element[4];
              flag = false;
              return item
            }
            return item
          })
          //missing element
          if(flag === true) {
            missing.push(element)
          }
        });
        const result = [...tempData, ...missing]
        await existingForecast.updateOne({$set:{data:result}})
        return res.status(201).json(existingForecast.toObject())
      }
      else {
        const forecast = new Forecast({
          userId: userId,
          date: date,
          dateFlag: dateFlag,
          data: data
        })
        const savedForecast = await forecast.save()
        return res.status(201).json(savedForecast.toObject())
      }
    } catch (error) {
      return res.status(500).json({ message: 'Server error', error: error.message })
    }
  }),

  get: asyncMiddleware(async (req, res) => {
    try {
      const{userId, date} = req.body
      const forecast = await Forecast.find({ $and: [{dateFlag: {$gte:date.from}, userId:userId}] })
      const result = forecast.filter(item => item.dateFlag <= date.to)
      if(result.length == 0 ) {
        return res.status(404).json({message: 'Forecast Not Founded!'})
      }
      return res.status(201).json(result)
    } catch (error) {
      return res.status(500).json({message: 'Server error', error: error.message})
    }
  }),
}