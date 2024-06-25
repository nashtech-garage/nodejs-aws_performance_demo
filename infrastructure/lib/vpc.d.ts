import { SecurityGroup, Vpc } from 'aws-cdk-lib/aws-ec2';
import { Construct } from 'constructs';
export declare class VPCResources extends Construct {
    sshSecurityGroup: SecurityGroup;
    vpc: Vpc;
    constructor(scope: Construct, id: string);
}
