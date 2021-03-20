var amqp = require('amqplib/callback_api');


module.exports = {
    addToQueue
}

function addToQueue(containerId) {
    let rmqUrl = 'amqp://' + process.env.RMQ_USER + ':' + process.env.RMQ_PWD + '@' + process.env.RMQ_SERVER_IP + '/' + process.env.RMQ_VHOST
    amqp.connect(rmqUrl, function (error0, connection) {
        if (error0) {
            throw error0;
        }
        connection.createChannel(function (error1, channel) {
            if (error1) {
                throw error1;
            }
            var queue = 'myjobqueue';
            var msg = containerId;

            channel.assertQueue(queue, {
                durable: true
            });

            channel.sendToQueue(queue, Buffer.from(msg));
            console.log(" [x] Sent %s", msg);

            // channel.consume(queue, function(msg) {
            //     console.log(" [x] Received %s", msg.content.toString());
            //   }, {
            //       noAck: true
            //     });
        });

       
        // setTimeout(function () {
        //     connection.close();
        //     process.exit(0)
        // }, 500);
    });
}