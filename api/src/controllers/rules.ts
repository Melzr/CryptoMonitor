import { NextFunction, Request, Response } from "express";
import { RuleManager } from "../service/ruleManager";

const rulesController = () => {
  const ruleManager = RuleManager.Instance;

  const addRule = async (req: Request, res: Response, next: NextFunction) => {
    const { rule } = req.body;
    const result = await ruleManager.setRule(rule.name, {
      condition: rule.condition,
      action: rule.action,
    });

    res.json({ rule });
  };

  const getRules = async (req: Request, res: Response, next: NextFunction) => {
    const rules = ruleManager.getRules();
    const result = Object.entries(rules).map(([key, value]) => {
      return { name: key, ...value };
    });
    res.json(result);
  };

  const deleteRule = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { name } = req.params;
    const rule = ruleManager.getRule(name);
    if (!rule) {
      res.status(404).json({ error: `Rule ${name} not found` });
      return;
    }

    await ruleManager.deleteRule(name);

    res.json({ rule: { name, ...rule } });
  };

  return {
    addRule,
    getRules,
    deleteRule,
  };
};

export default rulesController;
