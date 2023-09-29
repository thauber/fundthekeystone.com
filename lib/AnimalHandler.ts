import { NextApiRequest, NextApiResponse } from 'next';
import { Model, ModelFieldSet } from 'animal-orm'; // Replace with the actual import path of your AnimalOrm model

class AnimalHandler<M extends ModelFieldSet>  {
  private animal: Model<M>;
  private idKey: string;
  private index: string | null;

  constructor(animal: Model<M>, {idKey, index}:{idKey?: string, index?: string}) {
    this.animal = animal;
    this.idKey = idKey || 'id';
    this.index = index || null;
  }

  async getAll(req: NextApiRequest, res: NextApiResponse) {
  }

  async get(id: string, req: NextApiRequest, res: NextApiResponse) {
    const animal = await this.animal.zoo.get(id);
    res.status(200).json({ data: animal });
  }

  async post(req: NextApiRequest, res: NextApiResponse) {
    const animal = await this.animal.zoo.create(req.body);
    res.status(200).json({ data: animal });
  }

  async put(id: string, req: NextApiRequest, res: NextApiResponse) {
    const animal = await this.animal.zoo.update(id, req.body);
    res.status(200).json({ data: animal });
  }

  async delete(id: string, req: NextApiRequest, res: NextApiResponse) {
    await this.animal.zoo.delete(id); // Replace with your delete logic
    res.status(200).json({ deleted: true });
  }

  handle = async (req: NextApiRequest, res: NextApiResponse) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    const id = req.query[this.idKey];
    if (Array.isArray(id)) return res.status(400).end();
    switch (req.method) {
      case 'OPTIONS':
        return res.status(200);
      case 'POST':
        return this.post(req, res);
      case 'GET':
        if (id) return this.get(id, req, res);
        return this.getAll(req, res);
    }
    
    if (id === undefined) return res.status(400).end();
    
    

    switch (req.method) {
      case 'OPTIONS':
        return res.status(200);
      case 'GET':
        return this.get(id, req, res);
      case 'POST':
        return this.post(req, res);
      case 'PUT':
        return this.put(id, req, res);
      case 'DELETE':
        return this.delete(id, req, res);
      default:
        res.status(405).end(); // Method Not Allowed
    }
  };
}

export default AnimalHandler;
