import express from "express";
import { addUrl, deleteUrl, getAllUrls, getUrl } from "../controllers/urlControllers.js";
// import {getAllUrls, getUrl, deleteUrl, addUrl} from urlControllers
// import urlControllers from "../controllers/urlControllers";


const router = express.Router();

router.get('/shortUrl',getAllUrls)
router.get('/shortUrl/:id',getUrl)
router.post('/shortUrl',addUrl)
router.delete('/shortUrl/:id',deleteUrl)



export default router;