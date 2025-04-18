import express from "express";
import { urlModel } from "../model/dbData.js";

export const getAllUrls=async (req, res)=>{
    try {
        const {fullUrl} = req.body
    
        const shortUrls =await urlModel.find().sort({createdAt : -1})
        if(!shortUrls){
            res.status(404).send({'message':'Short urls not found !'})
        }
        else{
            res.status(200).send(shortUrls)
        }
        
    } catch (error) {
        res.status(500).send({error})
    }
}

export const getUrl=async (req, res)=>{
    try {

        console.log(req.params.id)
        const shortUrl = await urlModel.findOne({"shortUrl":req.params.id})
        if(!shortUrl){
            res.status(404).send({'message':'Full urls not found !'})
        }
        else{
            console.log('URL found !');
            shortUrl.clicks++;
            shortUrl.save();
            console.log("shortLong Url :",shortUrl.fullUrl);
            
            res.status(200).redirect(`${shortUrl.fullUrl}`)
        }
        
    } catch (error) {
        res.status(500).send(error)
    }
}


export const addUrl=async(req,res)=>{
    try {
        const {fullUrl} = req.body
    
        const foundUrl =await urlModel.find({fullUrl})
        if(foundUrl.length>0){
            res.status(409)
            res.send(foundUrl)
        }
        else{
            const shortUrl = await urlModel.create({fullUrl})
            res.status(201).send(shortUrl)
        }
        
    } catch (error) {
        res.status(500).send(error)
        console.log(error.message);
    }

}


export const deleteUrl=async(req, res)=>{
    try {
        console.log(req.params.id);
        const url = await urlModel.findByIdAndDelete({_id:req.params.id})
        if(url) return res.status(204).send({"message":"URL deleted !"})
        
    } catch (error) {
    console.log(error);        
    }

}
