import cron from 'node-cron'
import { main } from './worker-thread'


export const dailyNotification = cron.schedule('0 10 * * *', async () => {
  // console.log(cron.validate('0 10 * * *'))
  //  every day at 10 am
  console.log("job started")
  console.log('---------------------')
  main()
}, {
  scheduled: false,
  timezone: 'Africa/Cairo'
})
