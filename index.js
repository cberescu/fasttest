const path = require('path');
const resolve = require('path').resolve;
const fastify = require('fastify')({
  logger:true,
  ignoreTrailingSlash: true,
  maxParamLength: 300,
  trustProxy: true
});

 fastify.register(require('@fastify/view'), {
  engine: {
    eta: require('eta')
  },
  root:path.join(__dirname, 'web'),
  options: {
    filename: resolve('web'),
    async:true
  }
}) 


fastify.get('/',async (request,reply)=>{
	try {
		return await fastify.view('view.eta',{data:false});
	} catch (e) {
		return 'Error found'
	}

})

fastify.listen({port: process.env.PORT || 80, host:"0.0.0.0"} , (err, address) => {

  if (err) throw err
  

})