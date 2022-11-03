const schedule = require('node-schedule');



module.exports = (client) => {
    client.start = async() => {

        client.handleEvents();
        client.handleCommands();
        await client.login(process.env.TOKEN);

        await client.checkRenames();

        schedule.scheduleJob('*/1 * * * *', async () => {
            await client.processTracking();
        });
        
        schedule.scheduleJob('0 0 */ * *', async () => {
            await client.checkRenames();
        })
    }
}