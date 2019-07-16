module.exports = {
  hostname: process.argv[2] || process.env.HOSTNAME || '127.0.0.1',
  port: process.argv[3] || process.env.PORT || 3000,
  JWT_SECRET: process.env.JWT_SECRET,
  arrKeys: ['login', 'password', 'name', 'contact'],
  frontURI: process.env.FRONT_URI,
};
