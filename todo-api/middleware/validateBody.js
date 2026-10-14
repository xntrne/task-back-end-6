import { z } from "zod";


export function validateBody(schema) {
  return (req, res, next) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      const tree = z.treeifyError(result.error);
      res.status(422).json({ errors: tree.properties ?? { body: { errors: tree.errors } } });
      return;
    }

    req.body = result.data;
    next();
  };
}
