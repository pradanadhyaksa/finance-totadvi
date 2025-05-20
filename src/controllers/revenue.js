import { asyncMiddleware } from '../middlewares'
import { Revenue } from '../models/revenue'

export const CONTROLLER_REVENUE = {
  create: asyncMiddleware(async (req, res) => {
    try {
      const { userId, date, dateFlag, data } = req.body
      const existingRevenue = await Revenue.findOne({ userId, date })
      if (existingRevenue) {
        existingRevenue.data = data;
        await existingRevenue.updateOne({$set:{data:data}})
        res.status(201).json({message: 'Revenue Updated successfully', data: existingRevenue.toObject()})
      }
      else {
        const revenue = new Revenue({
          userId: userId,
          date: date,
          dateFlag: dateFlag,
          data: data
        })
        const savedRevenue = await revenue.save()
        res.status(201).json({ message: 'Revenue created successfully', data: savedRevenue.toObject() })
      }
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message })
    }
  }),

  getRevenue: asyncMiddleware(async (req, res) => {
    try {
      const{userId, date} = req.body
      const revenue = await Revenue.findOne({userId, date})
      if(!revenue) {
        return res.status(404).json({message: 'Revenue Not Founded!'})
      }

      res.status(201).json({message: 'Revenue Successfully Downloaded!', data:revenue.toObject()})
    } catch (error) {
      res.status(500).json({message: 'Server error', error: error.message})
    }
  }),

  getRevenueByMonth: asyncMiddleware(async (req, res) => {
    try {
      const{userId, date} = req.body
      const revenue = await Revenue.find({ $and: [{dateFlag: {$gte:date.from}, userId:userId}] })
      const result = revenue.filter(item => item.dateFlag <= date.to)
      if(result.length == 0 ) {
        return res.status(404).json({message: 'Revenue Not Founded!'})
      }
      res.status(201).json({message: 'Revenue Successfully Downloaded!', data: result})
    } catch (error) {
      res.status(500).json({message: 'Server error', error: error.message})
    }
  }),
}
