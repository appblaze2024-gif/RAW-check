import { db } from '../firebase.config';
import { collection, getDocs, addDoc, query, where } from 'firebase/firestore';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const q = collection(db, 'questions');
      const snapshot = await getDocs(q);
      const questions = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      res.status(200).json(questions);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else if (req.method === 'POST') {
    try {
      const { title, description, category, priority } = req.body;
      const docRef = await addDoc(collection(db, 'questions'), {
        title,
        description,
        category,
        priority,
        status: 'open',
        created_at: new Date(),
      });
      res.status(201).json({ id: docRef.id, title, description, category, priority });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}
