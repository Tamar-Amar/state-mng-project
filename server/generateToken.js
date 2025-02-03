import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config(); // טוען את משתני הסביבה

const userId = '679b6649230c820e997a24c3'; // שימי כאן ID של משתמש אמיתי מה-DB
const role = 'admin'; // או 'admin' אם את רוצה לבדוק הרשאות מנהל

// 🔹 בדיקה אם `JWT_SECRET` קיים
const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined in environment variables.');
}

const token = jwt.sign({ userId, role }, JWT_SECRET, { expiresIn: '1h' });

console.log('Generated Token:', token);
