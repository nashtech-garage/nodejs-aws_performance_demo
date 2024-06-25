"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EC2WebApp = void 0;
/* eslint-disable import/no-extraneous-dependencies */
const aws_cdk_lib_1 = require("aws-cdk-lib");
const dotenv_1 = require("dotenv");
const _1 = require(".");
const envValidator_1 = require("./envValidator");
(0, dotenv_1.config)();
class EC2WebApp extends aws_cdk_lib_1.Stack {
    constructor(scope, id, props) {
        super(scope, id, props);
        const { logLevel, sshPubKey, cpuType, instanceSize } = props;
        (0, envValidator_1.envValidator)(props);
        // Create VPC and Security Group
        const vpcResources = new _1.VPCResources(this, 'VPC');
        // Create EC2 Instance
        // We will pass props to ServerResources to create the EC2 instance
        const serverResources = new _1.ServerResources(this, 'EC2', {
            vpc: vpcResources.vpc,
            sshSecurityGroup: vpcResources.sshSecurityGroup,
            logLevel: logLevel,
            sshPubKey: sshPubKey,
            cpuType: cpuType,
            instanceSize: instanceSize.toLowerCase(),
        });
        // SSM Command to start a session
        new aws_cdk_lib_1.CfnOutput(this, 'ssmCommand', {
            value: `aws ssm start-session --target ${serverResources.instance.instanceId}`,
        });
        // SSH Command to connect to the EC2 Instance
        new aws_cdk_lib_1.CfnOutput(this, 'sshCommand', {
            value: `ssh ec2-user@${serverResources.instance.instancePublicDnsName}`,
        });
    }
}
exports.EC2WebApp = EC2WebApp;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWMyLWluc3RhbmNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZWMyLWluc3RhbmNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLHNEQUFzRDtBQUN0RCw2Q0FBZ0U7QUFFaEUsbUNBQWdDO0FBQ2hDLHdCQUFrRDtBQUNsRCxpREFBOEM7QUFFOUMsSUFBQSxlQUFNLEdBQUUsQ0FBQztBQVNULE1BQWEsU0FBVSxTQUFRLG1CQUFLO0lBQ2xDLFlBQVksS0FBZ0IsRUFBRSxFQUFVLEVBQUUsS0FBcUI7UUFDN0QsS0FBSyxDQUFDLEtBQUssRUFBRSxFQUFFLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFFeEIsTUFBTSxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUUsT0FBTyxFQUFFLFlBQVksRUFBRSxHQUFHLEtBQUssQ0FBQztRQUU3RCxJQUFBLDJCQUFZLEVBQUMsS0FBSyxDQUFDLENBQUM7UUFFcEIsZ0NBQWdDO1FBQ2hDLE1BQU0sWUFBWSxHQUFHLElBQUksZUFBWSxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQztRQUVuRCxzQkFBc0I7UUFDdEIsbUVBQW1FO1FBQ25FLE1BQU0sZUFBZSxHQUFHLElBQUksa0JBQWUsQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFO1lBQ3ZELEdBQUcsRUFBRSxZQUFZLENBQUMsR0FBRztZQUNyQixnQkFBZ0IsRUFBRSxZQUFZLENBQUMsZ0JBQWdCO1lBQy9DLFFBQVEsRUFBRSxRQUFRO1lBQ2xCLFNBQVMsRUFBRSxTQUFTO1lBQ3BCLE9BQU8sRUFBRSxPQUFPO1lBQ2hCLFlBQVksRUFBRSxZQUFZLENBQUMsV0FBVyxFQUFFO1NBQ3pDLENBQUMsQ0FBQztRQUVILGlDQUFpQztRQUNqQyxJQUFJLHVCQUFTLENBQUMsSUFBSSxFQUFFLFlBQVksRUFBRTtZQUNoQyxLQUFLLEVBQUUsa0NBQWtDLGVBQWUsQ0FBQyxRQUFRLENBQUMsVUFBVSxFQUFFO1NBQy9FLENBQUMsQ0FBQztRQUVILDZDQUE2QztRQUM3QyxJQUFJLHVCQUFTLENBQUMsSUFBSSxFQUFFLFlBQVksRUFBRTtZQUNoQyxLQUFLLEVBQUUsZ0JBQWdCLGVBQWUsQ0FBQyxRQUFRLENBQUMscUJBQXFCLEVBQUU7U0FDeEUsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztDQUNGO0FBaENELDhCQWdDQyIsInNvdXJjZXNDb250ZW50IjpbIi8qIGVzbGludC1kaXNhYmxlIGltcG9ydC9uby1leHRyYW5lb3VzLWRlcGVuZGVuY2llcyAqL1xuaW1wb3J0IHsgQXBwLCBTdGFjaywgU3RhY2tQcm9wcywgQ2ZuT3V0cHV0IH0gZnJvbSAnYXdzLWNkay1saWInO1xuaW1wb3J0IHsgQ29uc3RydWN0IH0gZnJvbSAnY29uc3RydWN0cyc7XG5pbXBvcnQgeyBjb25maWcgfSBmcm9tICdkb3RlbnYnO1xuaW1wb3J0IHsgVlBDUmVzb3VyY2VzLCBTZXJ2ZXJSZXNvdXJjZXMgfSBmcm9tICcuJztcbmltcG9ydCB7IGVudlZhbGlkYXRvciB9IGZyb20gJy4vZW52VmFsaWRhdG9yJztcblxuY29uZmlnKCk7XG5cbmV4cG9ydCBpbnRlcmZhY2UgRUMyV2ViQXBwUHJvcHMgZXh0ZW5kcyBTdGFja1Byb3BzIHtcbiAgbG9nTGV2ZWw6IHN0cmluZztcbiAgc3NoUHViS2V5OiBzdHJpbmc7XG4gIGNwdVR5cGU6IHN0cmluZztcbiAgaW5zdGFuY2VTaXplOiBzdHJpbmc7XG59XG5cbmV4cG9ydCBjbGFzcyBFQzJXZWJBcHAgZXh0ZW5kcyBTdGFjayB7XG4gIGNvbnN0cnVjdG9yKHNjb3BlOiBDb25zdHJ1Y3QsIGlkOiBzdHJpbmcsIHByb3BzOiBFQzJXZWJBcHBQcm9wcykge1xuICAgIHN1cGVyKHNjb3BlLCBpZCwgcHJvcHMpO1xuXG4gICAgY29uc3QgeyBsb2dMZXZlbCwgc3NoUHViS2V5LCBjcHVUeXBlLCBpbnN0YW5jZVNpemUgfSA9IHByb3BzO1xuXG4gICAgZW52VmFsaWRhdG9yKHByb3BzKTtcblxuICAgIC8vIENyZWF0ZSBWUEMgYW5kIFNlY3VyaXR5IEdyb3VwXG4gICAgY29uc3QgdnBjUmVzb3VyY2VzID0gbmV3IFZQQ1Jlc291cmNlcyh0aGlzLCAnVlBDJyk7XG5cbiAgICAvLyBDcmVhdGUgRUMyIEluc3RhbmNlXG4gICAgLy8gV2Ugd2lsbCBwYXNzIHByb3BzIHRvIFNlcnZlclJlc291cmNlcyB0byBjcmVhdGUgdGhlIEVDMiBpbnN0YW5jZVxuICAgIGNvbnN0IHNlcnZlclJlc291cmNlcyA9IG5ldyBTZXJ2ZXJSZXNvdXJjZXModGhpcywgJ0VDMicsIHtcbiAgICAgIHZwYzogdnBjUmVzb3VyY2VzLnZwYyxcbiAgICAgIHNzaFNlY3VyaXR5R3JvdXA6IHZwY1Jlc291cmNlcy5zc2hTZWN1cml0eUdyb3VwLFxuICAgICAgbG9nTGV2ZWw6IGxvZ0xldmVsLFxuICAgICAgc3NoUHViS2V5OiBzc2hQdWJLZXksXG4gICAgICBjcHVUeXBlOiBjcHVUeXBlLFxuICAgICAgaW5zdGFuY2VTaXplOiBpbnN0YW5jZVNpemUudG9Mb3dlckNhc2UoKSxcbiAgICB9KTtcblxuICAgIC8vIFNTTSBDb21tYW5kIHRvIHN0YXJ0IGEgc2Vzc2lvblxuICAgIG5ldyBDZm5PdXRwdXQodGhpcywgJ3NzbUNvbW1hbmQnLCB7XG4gICAgICB2YWx1ZTogYGF3cyBzc20gc3RhcnQtc2Vzc2lvbiAtLXRhcmdldCAke3NlcnZlclJlc291cmNlcy5pbnN0YW5jZS5pbnN0YW5jZUlkfWAsXG4gICAgfSk7XG5cbiAgICAvLyBTU0ggQ29tbWFuZCB0byBjb25uZWN0IHRvIHRoZSBFQzIgSW5zdGFuY2VcbiAgICBuZXcgQ2ZuT3V0cHV0KHRoaXMsICdzc2hDb21tYW5kJywge1xuICAgICAgdmFsdWU6IGBzc2ggZWMyLXVzZXJAJHtzZXJ2ZXJSZXNvdXJjZXMuaW5zdGFuY2UuaW5zdGFuY2VQdWJsaWNEbnNOYW1lfWAsXG4gICAgfSk7XG4gIH1cbn0iXX0=