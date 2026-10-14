import { z } from "zod";


export function validateParams(schema) {
  return (req, res, next) => {
    const result = schema.safeParse(req.params);

    if (!result.success) {
      res.status(422).json({ errors: z.treeifyError(result.error).properties });
      return;
    }

    req.params = result.data;
    next();
  };
}
