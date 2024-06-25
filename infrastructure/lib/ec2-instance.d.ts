import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
export interface EC2WebAppProps extends StackProps {
    logLevel: string;
    sshPubKey: string;
    cpuType: string;
    instanceSize: string;
}
export declare class EC2WebApp extends Stack {
    constructor(scope: Construct, id: string, props: EC2WebAppProps);
}
