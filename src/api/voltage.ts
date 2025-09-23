import { IncomingMessage, ServerResponse } from 'http';
import { VoltageClient } from 'voltage-api-sdk';

export async function handleVoltageRequest(req: IncomingMessage, res: ServerResponse, next: () => void) {
  const client = new VoltageClient({
    apiKey: process.env.VOLTAGE_API_KEY,
    baseUrl: process.env.VOLTAGE_BASE_URL || 'https://voltageapi.com/v1',
    timeout: parseInt(process.env.VOLTAGE_TIMEOUT || '30000')
  });
  
  if (req.method === 'POST') {
    try {
      // Read request body
      let body = '';
      req.on('data', chunk => {
        body += chunk.toString();
      });
      
      req.on('end', async () => {
        console.log('Voltage API called with data:', body);
        
        try {
          const payload = JSON.parse(body);
          
          // Validate required fields
          if (!payload.currency) {
            throw new Error('Currency is required');
          }
          if (payload.amount === undefined || payload.amount === null) {
            throw new Error('Amount is required');
          }
          
          let lightningPayment;
          
          if (payload.currency === 'btc') {
            // Bitcoin payment - convert sats to msats (multiply by 1000)
            const amountMsats = payload.amount * 1000;
            lightningPayment = await client.createPaymentRequest({
              organization_id: process.env.VOLTAGE_ORGANIZATION_ID,
              environment_id: process.env.VOLTAGE_ENV_ID,
              payment: {
                wallet_id: process.env.VOLTAGE_BITCOIN_WALLET_ID || "",
                currency: 'btc',
                amount_msats: amountMsats,
                payment_kind: 'bolt11',
                description: payload.description || 'Testing web app liberte',
              },
            });
          } else if (payload.currency === 'vc') {
            // Stablecoin payment - amount with 6 zeros added
            const ASSET = 'asset:034d8de991e76a6994753ddb4505d354873f96a1aa400a82eac1ee4fd443cfd62e';
            const amountWithZeros = payload.amount * 1_000_000;
            
            lightningPayment = await client.createPaymentRequest({
              organization_id: process.env.VOLTAGE_ORGANIZATION_ID,
              environment_id: process.env.VOLTAGE_ENV_ID,
              payment: {
                wallet_id: process.env.VOLTAGE_STABLECOIN_WALLET_ID || "",
                payment_kind: 'taprootasset',
                amount: {currency: ASSET, amount: amountWithZeros, unit: 'base units'},
                description: payload.description || 'Testing web app liberte',
              },
            });
          } else {
            throw new Error(`Unsupported currency: ${payload.currency}`);
          }
          
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
        } catch (parseError) {
          console.error('Error processing payment request:', parseError);
          res.statusCode = 400;
          res.setHeader('Content-Type', 'application/json');
          res.setHeader('Access-Control-Allow-Origin', '*');
          res.end(JSON.stringify({ 
            error: 'Bad request',
            message: parseError instanceof Error ? parseError.message : 'Invalid request format'
          }));
        }
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