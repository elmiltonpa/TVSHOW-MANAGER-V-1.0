import "dotenv/config";

const PORT = process.env.PORT || 3001;
const MONGODB_URI = process.env.MONGODB_URI!;
const TMDB_API_KEY = process.env.TMDB_API_KEY!;
const JWT_SECRET = process.env.JWT_SECRET!;

if (!MONGODB_URI || !TMDB_API_KEY || !JWT_SECRET) {
  console.error("Missing essential environment variables!");
  process.exit(1);
}

export default {
  PORT,
  MONGODB_URI,
  TMDB_API_KEY,
  JWT_SECRET,
};
