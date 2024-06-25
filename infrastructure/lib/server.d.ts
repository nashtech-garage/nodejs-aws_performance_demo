import { Vpc, SecurityGroup, Instance } from 'aws-cdk-lib/aws-ec2';
import { Construct } from 'constructs';
interface ServerProps {
    vpc: Vpc;
    sshSecurityGroup: SecurityGroup;
    logLevel: string;
    sshPubKey: string;
    cpuType: string;
    instanceSize: string;
}
export declare class ServerResources extends Construct {
    instance: Instance;
    constructor(scope: Construct, id: string, props: ServerProps);
}
export {};
