const logger = (req, res, next) => {
  // İstek tarihini ve saatini alır.
  // Gets the request date and time.
  const timestamp = new Date().toISOString();

  // İstek bilgilerini oluşturur.
  // Creates the request information.
  const log = `[${timestamp}] ${req.method} ${req.originalUrl}`;

  console.log(log);

  next();
};

module.exports = logger;
