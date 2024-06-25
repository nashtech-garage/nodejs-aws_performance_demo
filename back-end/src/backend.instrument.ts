import { NodeTracerProvider } from '@opentelemetry/sdk-trace-node';
import {NestInstrumentation } from '@opentelemetry/instrumentation-nestjs-core';
import {registerInstrumentations } from '@opentelemetry/instrumentation';

const BackendInstrument = async() => {
    const provider = new NodeTracerProvider();
    provider.register();
    
    console.log('Vao trong day');

    registerInstrumentations({
      instrumentations: [
        new NestInstrumentation(),
      ],
    });
}

export default BackendInstrument;