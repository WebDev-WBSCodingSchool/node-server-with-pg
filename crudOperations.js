import pg from 'pg';
const { Client } = pg;
// Import utility functions
import { getResourceId, processBodyFromRequest, returnErrorWithMessage } from './utils.js';

export const createPost = async (req, res) => {
  try {
    const body = await processBodyFromRequest(req);
    if (!body) return returnErrorWithMessage(res, 400, 'Body is required');
    const parsedBody = JSON.parse(body);
    console.log('Here we have access to the body: ', parsedBody);
    res.statusCode = 201;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ message: 'Post created' }));
  } catch (error) {
    returnErrorWithMessage(res);
  }
};

export const getPosts = async (req, res) => {
  try {
    const client = new Client({
      connectionString: process.env.PG_URI
    });
    await client.connect();
    const results = await client.query('SELECT * FROM posts;');
    await client.end();
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(results.rows));
  } catch (error) {
    console.error('Error fetching posts: ', error);
    returnErrorWithMessage(res);
  }
};

export const getPostById = (req, res) => {
  const id = getResourceId(req.url);
  console.log('Here we have access to the ID: ', id);
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify({ message: 'Post fetched' }));
};

export const updatePost = (req, res) => {
  const id = getResourceId(req.url);
  console.log('Here we have access to the ID: ', id);
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify({ message: 'Post updated' }));
};

export const deletePost = (req, res) => {
  const id = getResourceId(req.url);
  console.log('Here we have access to the ID: ', id);
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify({ message: 'Post deleted' }));
};
