import { IncomingMessage, ServerResponse } from 'http';
import { VoltageClient } from 'voltage-api-sdk';

export async function handleVoltageRequest(req: IncomingMessage, res: ServerResponse, next: () => void) {
  const client = new VoltageClient({
    apiKey: process.env.VOLTAGE_API_KEY,
    baseUrl: process.env.VOLTAGE_BASE_URL || 'https://voltageapi.com/v1',
    timeout: parseInt(process.env.VOLTAGE_TIMEOUT || '30000')
  });
  
  const lightningPayment = await client.createPaymentRequest({
    organization_id: process.env.VOLTAGE_ORGANIZATION_ID,
    environment_id: process.env.VOLTAGE_ENV_ID,
    payment: {
      wallet_id: process.env.VOLTAGE_WALLET_ID || "",
      currency: 'btc',
      amount_msats: 150000,
      payment_kind: 'bolt11',
      description: 'Testing web app liberte',
    },
  });

  
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
          ...lightningPayment
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