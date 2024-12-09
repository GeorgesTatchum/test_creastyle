import { Request, Response } from 'express';
import { contact_data } from "../models/contact";

// GET /contacts : Récupérer tous les contacts
export const getContats = async (req: Request, res: Response): Promise<Response> => {
    return res.status(200).json(contact_data);
  };
  
// GET /contacts/:id : Récupérer un contact par ID
export const getContatById = async (req: Request, res: Response): Promise<Response> => {
    const contact = contact_data.find((c:any) => c.id === req.params.id);
    if (!contact) {
      return res.status(404).json({ error: "Contact non trouvé." });
    }
    return res.status(200).json(contact);
  };
  
// POST /contacts : Créer un nouveau contact
export const createContat = async (req: Request, res: Response): Promise<Response> => {
    const newContact = {
      id: `${Date.now()}`, // Génération d'un identifiant unique
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone || null,
    };
    contact_data.push(newContact);
    return res.status(201).json(newContact);
  };
  
// PUT /contacts/:id : Mettre à jour un contact existant
export const updateContat = async (req: Request, res: Response): Promise<Response> => {
    const contactIndex = contact_data.findIndex((c: any) => c.id === req.params.id);
  
    if (contactIndex === -1) {
      return res.status(404).json({ error: "Contact non trouvé." });
    }
  
    contact_data[contactIndex] = {
      ...contact_data[contactIndex],
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone || contact_data[contactIndex].phone,
    };
  
    return res.status(200).json(contact_data[contactIndex]);
  };
  
// DELETE /contacts/:id : Supprimer un contact
export const deleteContatById = async (req: Request, res: Response): Promise<Response> => {
    const contactIndex = contact_data.findIndex((c) => c.id === req.params.id);
  
    if (contactIndex === -1) {
      return res.status(404).json({ error: "Contact non trouvé." });
    }
  
    contact_data.splice(contactIndex, 1);
    return res.status(204).send(); // Réponse sans contenu
  };