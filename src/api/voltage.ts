import { IncomingMessage, ServerResponse } from 'http';

export function handleVoltageRequest(req: IncomingMessage, res: ServerResponse, next: () => void) {
  if (req.method === 'POST') {
    try {
      // Read request body
      let body = '';
      req.on('data', chunk => {
        body += chunk.toString();
      });
      
      req.on('end', () => {
        console.log('Voltage API called with data:', body);
        
        // Return 202 Accepted status
        res.statusCode = 202;
        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
        
        const response = {
          message: 'Voltage request received and accepted',
          timestamp: new Date().toISOString(),
          status: 'accepted'
        };
        
        res.end(JSON.stringify(response));
      });
    } catch (error) {
      console.error('Error handling voltage request:', error);
      res.statusCode = 500;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ 
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'Unknown error'
      }));
    }
  } else if (req.method === 'OPTIONS') {
    // Handle CORS preflight
    res.statusCode = 200;
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.end();
  } else {
    next();
  }
}