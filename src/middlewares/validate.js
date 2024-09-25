const validateReqBody =
  (joiSchema, part = body) =>
  async (req, res, next) => {
    try {
      await joiSchema.validateAsync(req[part]);
      next();
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  };

export default validateReqBody;
