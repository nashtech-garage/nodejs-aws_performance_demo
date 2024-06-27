"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServerResources = void 0;
const aws_ec2_1 = require("aws-cdk-lib/aws-ec2");
const aws_iam_1 = require("aws-cdk-lib/aws-iam");
const constructs_1 = require("constructs");
let cpuType;
let instanceClass;
let instanceSize;
class ServerResources extends constructs_1.Construct {
    constructor(scope, id, props) {
        super(scope, id);
        // Create a role for the EC2 instance to assume.  This role will allow the instance to put log events to CloudWatch Logs
        const serverRole = new aws_iam_1.Role(this, 'serverEc2Role', {
            assumedBy: new aws_iam_1.ServicePrincipal('ec2.amazonaws.com'),
            inlinePolicies: {
                ['RetentionPolicy']: new aws_iam_1.PolicyDocument({
                    statements: [
                        new aws_iam_1.PolicyStatement({
                            resources: ['*'],
                            actions: ['logs:PutRetentionPolicy'],
                        }),
                    ],
                }),
            },
            managedPolicies: [
                aws_iam_1.ManagedPolicy.fromAwsManagedPolicyName('AmazonSSMManagedInstanceCore'),
                aws_iam_1.ManagedPolicy.fromAwsManagedPolicyName('CloudWatchAgentServerPolicy'),
            ],
        });
        const userData = aws_ec2_1.UserData.forLinux();
        // Add user data that is used to configure the EC2 instance
        userData.addCommands('yum update -y', 'curl -sL https://dl.yarnpkg.com/rpm/yarn.repo | sudo tee /etc/yum.repos.d/yarn.repo', 'curl -sL https://rpm.nodesource.com/setup_20.x | sudo -E bash - ', 'yum install -y git', 'yum install -y amazon-cloudwatch-agent nodejs python3-pip zip unzip docker yarn', 'sudo systemctl enable docker', 'sudo systemctl start docker', 'sudo dnf update', 'sudo dnf install -y nginx', 'sudo systemctl start nginx.service', 'sudo systemctl status nginx.service', 'sudo systemctl enable nginx.service');
        // Create a Security Group for the EC2 instance.  This group will allow SSH access to the EC2 instance
        const ec2InstanceSecurityGroup = new aws_ec2_1.SecurityGroup(this, 'ec2InstanceSecurityGroup', { vpc: props.vpc, allowAllOutbound: true });
        // Determine the correct CPUType and Instance Class based on the props passed in
        if (props.cpuType == 'ARM64') {
            cpuType = aws_ec2_1.AmazonLinuxCpuType.ARM_64;
            instanceClass = aws_ec2_1.InstanceClass.M7G;
        }
        else {
            cpuType = aws_ec2_1.AmazonLinuxCpuType.X86_64;
            instanceClass = aws_ec2_1.InstanceClass.T2;
        }
        // Determine the correct InstanceSize based on the props passed in
        switch (props.instanceSize) {
            case 'micro':
                instanceSize = aws_ec2_1.InstanceSize.MICRO;
                break;
            case 'large':
                instanceSize = aws_ec2_1.InstanceSize.LARGE;
                break;
            case 'xlarge':
                instanceSize = aws_ec2_1.InstanceSize.XLARGE;
                break;
            case 'xlarge2':
                instanceSize = aws_ec2_1.InstanceSize.XLARGE2;
                break;
            case 'xlarge4':
                instanceSize = aws_ec2_1.InstanceSize.XLARGE4;
                break;
            case 'medium':
                instanceSize = aws_ec2_1.InstanceSize.MEDIUM;
                break;
            default:
                instanceSize = aws_ec2_1.InstanceSize.LARGE;
        }
        this.instance = new aws_ec2_1.Instance(this, 'webappServer', {
            vpc: props.vpc,
            role: serverRole,
            securityGroup: ec2InstanceSecurityGroup,
            instanceType: aws_ec2_1.InstanceType.of(instanceClass, instanceSize),
            machineImage: aws_ec2_1.MachineImage.latestAmazonLinux2023({
                cachedInContext: false,
                cpuType: cpuType,
            }),
            // Should input your ec2 key here
            keyName: 'vuilendi-fund-ec2',
            userData: userData,
        });
        // Add the SSH Security Group to the EC2 instance
        this.instance.addSecurityGroup(props.sshSecurityGroup);
    }
}
exports.ServerResources = ServerResources;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic2VydmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUVBLGlEQWM2QjtBQUM3QixpREFNNkI7QUFDN0IsMkNBQXVDO0FBV3ZDLElBQUksT0FBMkIsQ0FBQztBQUNoQyxJQUFJLGFBQTRCLENBQUM7QUFDakMsSUFBSSxZQUEwQixDQUFDO0FBRS9CLE1BQWEsZUFBZ0IsU0FBUSxzQkFBUztJQUcxQyxZQUFZLEtBQWdCLEVBQUUsRUFBVSxFQUFFLEtBQWtCO1FBQ3hELEtBQUssQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFFakIsd0hBQXdIO1FBQ3hILE1BQU0sVUFBVSxHQUFHLElBQUksY0FBSSxDQUFDLElBQUksRUFBRSxlQUFlLEVBQUU7WUFDL0MsU0FBUyxFQUFFLElBQUksMEJBQWdCLENBQUMsbUJBQW1CLENBQUM7WUFDcEQsY0FBYyxFQUFFO2dCQUNaLENBQUMsaUJBQWlCLENBQUMsRUFBRSxJQUFJLHdCQUFjLENBQUM7b0JBQ3BDLFVBQVUsRUFBRTt3QkFDUixJQUFJLHlCQUFlLENBQUM7NEJBQ2hCLFNBQVMsRUFBRSxDQUFDLEdBQUcsQ0FBQzs0QkFDaEIsT0FBTyxFQUFFLENBQUMseUJBQXlCLENBQUM7eUJBQ3ZDLENBQUM7cUJBQ0w7aUJBQ0osQ0FBQzthQUNMO1lBQ0QsZUFBZSxFQUFFO2dCQUNiLHVCQUFhLENBQUMsd0JBQXdCLENBQUMsOEJBQThCLENBQUM7Z0JBQ3RFLHVCQUFhLENBQUMsd0JBQXdCLENBQUMsNkJBQTZCLENBQUM7YUFDeEU7U0FDSixDQUFDLENBQUM7UUFFSCxNQUFNLFFBQVEsR0FBRyxrQkFBUSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBRXJDLDJEQUEyRDtRQUMzRCxRQUFRLENBQUMsV0FBVyxDQUNoQixlQUFlLEVBQ2YscUZBQXFGLEVBQ3JGLGtFQUFrRSxFQUNsRSxvQkFBb0IsRUFDcEIsaUZBQWlGLEVBQ2pGLDhCQUE4QixFQUM5Qiw2QkFBNkIsRUFDN0IsaUJBQWlCLEVBQ2pCLDJCQUEyQixFQUMzQixvQ0FBb0MsRUFDcEMscUNBQXFDLEVBQ3JDLHFDQUFxQyxDQUN4QyxDQUFDO1FBRUYsc0dBQXNHO1FBQ3RHLE1BQU0sd0JBQXdCLEdBQUcsSUFBSSx1QkFBYSxDQUM5QyxJQUFJLEVBQ0osMEJBQTBCLEVBQzFCLEVBQUUsR0FBRyxFQUFFLEtBQUssQ0FBQyxHQUFHLEVBQUUsZ0JBQWdCLEVBQUUsSUFBSSxFQUFFLENBQzdDLENBQUM7UUFFRixnRkFBZ0Y7UUFDaEYsSUFBSSxLQUFLLENBQUMsT0FBTyxJQUFJLE9BQU8sRUFBRTtZQUMxQixPQUFPLEdBQUcsNEJBQWtCLENBQUMsTUFBTSxDQUFDO1lBQ3BDLGFBQWEsR0FBRyx1QkFBYSxDQUFDLEdBQUcsQ0FBQztTQUNyQzthQUFNO1lBQ0gsT0FBTyxHQUFHLDRCQUFrQixDQUFDLE1BQU0sQ0FBQztZQUNwQyxhQUFhLEdBQUcsdUJBQWEsQ0FBQyxFQUFFLENBQUM7U0FDcEM7UUFFRCxrRUFBa0U7UUFDbEUsUUFBUSxLQUFLLENBQUMsWUFBWSxFQUFFO1lBQ3hCLEtBQUssT0FBTztnQkFDUixZQUFZLEdBQUcsc0JBQVksQ0FBQyxLQUFLLENBQUM7Z0JBQ2xDLE1BQU07WUFDVixLQUFLLE9BQU87Z0JBQ1IsWUFBWSxHQUFHLHNCQUFZLENBQUMsS0FBSyxDQUFDO2dCQUNsQyxNQUFNO1lBQ1YsS0FBSyxRQUFRO2dCQUNULFlBQVksR0FBRyxzQkFBWSxDQUFDLE1BQU0sQ0FBQztnQkFDbkMsTUFBTTtZQUNWLEtBQUssU0FBUztnQkFDVixZQUFZLEdBQUcsc0JBQVksQ0FBQyxPQUFPLENBQUM7Z0JBQ3BDLE1BQU07WUFDVixLQUFLLFNBQVM7Z0JBQ1YsWUFBWSxHQUFHLHNCQUFZLENBQUMsT0FBTyxDQUFDO2dCQUNwQyxNQUFNO1lBQ1YsS0FBSyxRQUFRO2dCQUNULFlBQVksR0FBRyxzQkFBWSxDQUFDLE1BQU0sQ0FBQztnQkFDbkMsTUFBTTtZQUNWO2dCQUNJLFlBQVksR0FBRyxzQkFBWSxDQUFDLEtBQUssQ0FBQztTQUN6QztRQUVELElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxrQkFBUSxDQUFDLElBQUksRUFBRSxjQUFjLEVBQUU7WUFDL0MsR0FBRyxFQUFFLEtBQUssQ0FBQyxHQUFHO1lBQ2QsSUFBSSxFQUFFLFVBQVU7WUFDaEIsYUFBYSxFQUFFLHdCQUF3QjtZQUN2QyxZQUFZLEVBQUUsc0JBQVksQ0FBQyxFQUFFLENBQUMsYUFBYSxFQUFFLFlBQVksQ0FBQztZQUMxRCxZQUFZLEVBQUUsc0JBQVksQ0FBQyxxQkFBcUIsQ0FBQztnQkFDN0MsZUFBZSxFQUFFLEtBQUs7Z0JBQ3RCLE9BQU8sRUFBRSxPQUFPO2FBQ25CLENBQUM7WUFDRixpQ0FBaUM7WUFDakMsT0FBTyxFQUFFLG1CQUFtQjtZQUM1QixRQUFRLEVBQUUsUUFBUTtTQUNyQixDQUFDLENBQUM7UUFFSCxpREFBaUQ7UUFDakQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztJQUMzRCxDQUFDO0NBQ0o7QUFwR0QsMENBb0dDIiwic291cmNlc0NvbnRlbnQiOlsiLyogZXNsaW50LWRpc2FibGUgaW1wb3J0L25vLWV4dHJhbmVvdXMtZGVwZW5kZW5jaWVzICovXG5pbXBvcnQgeyBSZW1vdmFsUG9saWN5LCBEdXJhdGlvbiwgU3RhY2sgfSBmcm9tICdhd3MtY2RrLWxpYic7XG5pbXBvcnQge1xuICAgIFZwYyxcbiAgICBTZWN1cml0eUdyb3VwLFxuICAgIEluc3RhbmNlLFxuICAgIEluc3RhbmNlVHlwZSxcbiAgICBJbnN0YW5jZUNsYXNzLFxuICAgIEluc3RhbmNlU2l6ZSxcbiAgICBDbG91ZEZvcm1hdGlvbkluaXQsXG4gICAgSW5pdENvbmZpZyxcbiAgICBJbml0RmlsZSxcbiAgICBJbml0Q29tbWFuZCxcbiAgICBVc2VyRGF0YSxcbiAgICBNYWNoaW5lSW1hZ2UsXG4gICAgQW1hem9uTGludXhDcHVUeXBlLFxufSBmcm9tICdhd3MtY2RrLWxpYi9hd3MtZWMyJztcbmltcG9ydCB7XG4gICAgUm9sZSxcbiAgICBTZXJ2aWNlUHJpbmNpcGFsLFxuICAgIE1hbmFnZWRQb2xpY3ksXG4gICAgUG9saWN5RG9jdW1lbnQsXG4gICAgUG9saWN5U3RhdGVtZW50LFxufSBmcm9tICdhd3MtY2RrLWxpYi9hd3MtaWFtJztcbmltcG9ydCB7IENvbnN0cnVjdCB9IGZyb20gJ2NvbnN0cnVjdHMnO1xuXG5pbnRlcmZhY2UgU2VydmVyUHJvcHMge1xuICAgIHZwYzogVnBjO1xuICAgIHNzaFNlY3VyaXR5R3JvdXA6IFNlY3VyaXR5R3JvdXA7XG4gICAgbG9nTGV2ZWw6IHN0cmluZztcbiAgICBzc2hQdWJLZXk6IHN0cmluZztcbiAgICBjcHVUeXBlOiBzdHJpbmc7XG4gICAgaW5zdGFuY2VTaXplOiBzdHJpbmc7XG59XG5cbmxldCBjcHVUeXBlOiBBbWF6b25MaW51eENwdVR5cGU7XG5sZXQgaW5zdGFuY2VDbGFzczogSW5zdGFuY2VDbGFzcztcbmxldCBpbnN0YW5jZVNpemU6IEluc3RhbmNlU2l6ZTtcblxuZXhwb3J0IGNsYXNzIFNlcnZlclJlc291cmNlcyBleHRlbmRzIENvbnN0cnVjdCB7XG4gICAgcHVibGljIGluc3RhbmNlOiBJbnN0YW5jZTtcblxuICAgIGNvbnN0cnVjdG9yKHNjb3BlOiBDb25zdHJ1Y3QsIGlkOiBzdHJpbmcsIHByb3BzOiBTZXJ2ZXJQcm9wcykge1xuICAgICAgICBzdXBlcihzY29wZSwgaWQpO1xuXG4gICAgICAgIC8vIENyZWF0ZSBhIHJvbGUgZm9yIHRoZSBFQzIgaW5zdGFuY2UgdG8gYXNzdW1lLiAgVGhpcyByb2xlIHdpbGwgYWxsb3cgdGhlIGluc3RhbmNlIHRvIHB1dCBsb2cgZXZlbnRzIHRvIENsb3VkV2F0Y2ggTG9nc1xuICAgICAgICBjb25zdCBzZXJ2ZXJSb2xlID0gbmV3IFJvbGUodGhpcywgJ3NlcnZlckVjMlJvbGUnLCB7XG4gICAgICAgICAgICBhc3N1bWVkQnk6IG5ldyBTZXJ2aWNlUHJpbmNpcGFsKCdlYzIuYW1hem9uYXdzLmNvbScpLFxuICAgICAgICAgICAgaW5saW5lUG9saWNpZXM6IHtcbiAgICAgICAgICAgICAgICBbJ1JldGVudGlvblBvbGljeSddOiBuZXcgUG9saWN5RG9jdW1lbnQoe1xuICAgICAgICAgICAgICAgICAgICBzdGF0ZW1lbnRzOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICBuZXcgUG9saWN5U3RhdGVtZW50KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvdXJjZXM6IFsnKiddLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvbnM6IFsnbG9nczpQdXRSZXRlbnRpb25Qb2xpY3knXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG1hbmFnZWRQb2xpY2llczogW1xuICAgICAgICAgICAgICAgIE1hbmFnZWRQb2xpY3kuZnJvbUF3c01hbmFnZWRQb2xpY3lOYW1lKCdBbWF6b25TU01NYW5hZ2VkSW5zdGFuY2VDb3JlJyksXG4gICAgICAgICAgICAgICAgTWFuYWdlZFBvbGljeS5mcm9tQXdzTWFuYWdlZFBvbGljeU5hbWUoJ0Nsb3VkV2F0Y2hBZ2VudFNlcnZlclBvbGljeScpLFxuICAgICAgICAgICAgXSxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgY29uc3QgdXNlckRhdGEgPSBVc2VyRGF0YS5mb3JMaW51eCgpO1xuXG4gICAgICAgIC8vIEFkZCB1c2VyIGRhdGEgdGhhdCBpcyB1c2VkIHRvIGNvbmZpZ3VyZSB0aGUgRUMyIGluc3RhbmNlXG4gICAgICAgIHVzZXJEYXRhLmFkZENvbW1hbmRzKFxuICAgICAgICAgICAgJ3l1bSB1cGRhdGUgLXknLFxuICAgICAgICAgICAgJ2N1cmwgLXNMIGh0dHBzOi8vZGwueWFybnBrZy5jb20vcnBtL3lhcm4ucmVwbyB8IHN1ZG8gdGVlIC9ldGMveXVtLnJlcG9zLmQveWFybi5yZXBvJyxcbiAgICAgICAgICAgICdjdXJsIC1zTCBodHRwczovL3JwbS5ub2Rlc291cmNlLmNvbS9zZXR1cF8yMC54IHwgc3VkbyAtRSBiYXNoIC0gJyxcbiAgICAgICAgICAgICd5dW0gaW5zdGFsbCAteSBnaXQnLFxuICAgICAgICAgICAgJ3l1bSBpbnN0YWxsIC15IGFtYXpvbi1jbG91ZHdhdGNoLWFnZW50IG5vZGVqcyBweXRob24zLXBpcCB6aXAgdW56aXAgZG9ja2VyIHlhcm4nLFxuICAgICAgICAgICAgJ3N1ZG8gc3lzdGVtY3RsIGVuYWJsZSBkb2NrZXInLFxuICAgICAgICAgICAgJ3N1ZG8gc3lzdGVtY3RsIHN0YXJ0IGRvY2tlcicsXG4gICAgICAgICAgICAnc3VkbyBkbmYgdXBkYXRlJyxcbiAgICAgICAgICAgICdzdWRvIGRuZiBpbnN0YWxsIC15IG5naW54JyxcbiAgICAgICAgICAgICdzdWRvIHN5c3RlbWN0bCBzdGFydCBuZ2lueC5zZXJ2aWNlJyxcbiAgICAgICAgICAgICdzdWRvIHN5c3RlbWN0bCBzdGF0dXMgbmdpbnguc2VydmljZScsXG4gICAgICAgICAgICAnc3VkbyBzeXN0ZW1jdGwgZW5hYmxlIG5naW54LnNlcnZpY2UnLFxuICAgICAgICApO1xuXG4gICAgICAgIC8vIENyZWF0ZSBhIFNlY3VyaXR5IEdyb3VwIGZvciB0aGUgRUMyIGluc3RhbmNlLiAgVGhpcyBncm91cCB3aWxsIGFsbG93IFNTSCBhY2Nlc3MgdG8gdGhlIEVDMiBpbnN0YW5jZVxuICAgICAgICBjb25zdCBlYzJJbnN0YW5jZVNlY3VyaXR5R3JvdXAgPSBuZXcgU2VjdXJpdHlHcm91cChcbiAgICAgICAgICAgIHRoaXMsXG4gICAgICAgICAgICAnZWMySW5zdGFuY2VTZWN1cml0eUdyb3VwJyxcbiAgICAgICAgICAgIHsgdnBjOiBwcm9wcy52cGMsIGFsbG93QWxsT3V0Ym91bmQ6IHRydWUgfSxcbiAgICAgICAgKTtcblxuICAgICAgICAvLyBEZXRlcm1pbmUgdGhlIGNvcnJlY3QgQ1BVVHlwZSBhbmQgSW5zdGFuY2UgQ2xhc3MgYmFzZWQgb24gdGhlIHByb3BzIHBhc3NlZCBpblxuICAgICAgICBpZiAocHJvcHMuY3B1VHlwZSA9PSAnQVJNNjQnKSB7XG4gICAgICAgICAgICBjcHVUeXBlID0gQW1hem9uTGludXhDcHVUeXBlLkFSTV82NDtcbiAgICAgICAgICAgIGluc3RhbmNlQ2xhc3MgPSBJbnN0YW5jZUNsYXNzLk03RztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNwdVR5cGUgPSBBbWF6b25MaW51eENwdVR5cGUuWDg2XzY0O1xuICAgICAgICAgICAgaW5zdGFuY2VDbGFzcyA9IEluc3RhbmNlQ2xhc3MuVDI7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBEZXRlcm1pbmUgdGhlIGNvcnJlY3QgSW5zdGFuY2VTaXplIGJhc2VkIG9uIHRoZSBwcm9wcyBwYXNzZWQgaW5cbiAgICAgICAgc3dpdGNoIChwcm9wcy5pbnN0YW5jZVNpemUpIHtcbiAgICAgICAgICAgIGNhc2UgJ21pY3JvJzpcbiAgICAgICAgICAgICAgICBpbnN0YW5jZVNpemUgPSBJbnN0YW5jZVNpemUuTUlDUk87XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdsYXJnZSc6XG4gICAgICAgICAgICAgICAgaW5zdGFuY2VTaXplID0gSW5zdGFuY2VTaXplLkxBUkdFO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAneGxhcmdlJzpcbiAgICAgICAgICAgICAgICBpbnN0YW5jZVNpemUgPSBJbnN0YW5jZVNpemUuWExBUkdFO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAneGxhcmdlMic6XG4gICAgICAgICAgICAgICAgaW5zdGFuY2VTaXplID0gSW5zdGFuY2VTaXplLlhMQVJHRTI7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICd4bGFyZ2U0JzpcbiAgICAgICAgICAgICAgICBpbnN0YW5jZVNpemUgPSBJbnN0YW5jZVNpemUuWExBUkdFNDtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ21lZGl1bSc6XG4gICAgICAgICAgICAgICAgaW5zdGFuY2VTaXplID0gSW5zdGFuY2VTaXplLk1FRElVTTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgaW5zdGFuY2VTaXplID0gSW5zdGFuY2VTaXplLkxBUkdFO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5pbnN0YW5jZSA9IG5ldyBJbnN0YW5jZSh0aGlzLCAnd2ViYXBwU2VydmVyJywge1xuICAgICAgICAgICAgdnBjOiBwcm9wcy52cGMsXG4gICAgICAgICAgICByb2xlOiBzZXJ2ZXJSb2xlLFxuICAgICAgICAgICAgc2VjdXJpdHlHcm91cDogZWMySW5zdGFuY2VTZWN1cml0eUdyb3VwLFxuICAgICAgICAgICAgaW5zdGFuY2VUeXBlOiBJbnN0YW5jZVR5cGUub2YoaW5zdGFuY2VDbGFzcywgaW5zdGFuY2VTaXplKSxcbiAgICAgICAgICAgIG1hY2hpbmVJbWFnZTogTWFjaGluZUltYWdlLmxhdGVzdEFtYXpvbkxpbnV4MjAyMyh7XG4gICAgICAgICAgICAgICAgY2FjaGVkSW5Db250ZXh0OiBmYWxzZSxcbiAgICAgICAgICAgICAgICBjcHVUeXBlOiBjcHVUeXBlLFxuICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAvLyBTaG91bGQgaW5wdXQgeW91ciBlYzIga2V5IGhlcmVcbiAgICAgICAgICAgIGtleU5hbWU6ICd2dWlsZW5kaS1mdW5kLWVjMicsXG4gICAgICAgICAgICB1c2VyRGF0YTogdXNlckRhdGEsXG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIEFkZCB0aGUgU1NIIFNlY3VyaXR5IEdyb3VwIHRvIHRoZSBFQzIgaW5zdGFuY2VcbiAgICAgICAgdGhpcy5pbnN0YW5jZS5hZGRTZWN1cml0eUdyb3VwKHByb3BzLnNzaFNlY3VyaXR5R3JvdXApO1xuICAgIH1cbn0iXX0=