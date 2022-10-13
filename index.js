const path = require('path');
const resolve = require('path').resolve;
const ETA = require('eta')
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
		return await ETA.renderFile('web/view.eta',{data:false});
	} catch (e) {
		return 'Error found'
	}

})
fastify.get('/a',async (request,reply)=>{
	try {
		return await ETA.renderFile(path.join(__dirname, 'web','view.eta'),{data:false},ETA.getConfig({ async: true }));
	} catch (e) {
    console.log(e);
		return 'Error found'
	}

})
fastify.listen({port: process.env.PORT || 80, host:"0.0.0.0"} , (err, address) => {

  if (err) throw err
  

})