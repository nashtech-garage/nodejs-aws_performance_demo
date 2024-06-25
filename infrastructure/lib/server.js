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
        userData.addCommands('yum update -y', 'curl -sL https://dl.yarnpkg.com/rpm/yarn.repo | sudo tee /etc/yum.repos.d/yarn.repo', 'curl -sL https://rpm.nodesource.com/setup_20.x | sudo -E bash - ', 'yum install -y amazon-cloudwatch-agent nodejs python3-pip zip unzip docker yarn', 'sudo systemctl enable docker', 'sudo systemctl start docker', 'sudo dnf update', 'sudo dnf install -y nginx', 'sudo systemctl start nginx.service', 'sudo systemctl status nginx.service', 'sudo systemctl enable nginx.service');
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic2VydmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUVBLGlEQWM2QjtBQUM3QixpREFNNkI7QUFHN0IsMkNBQXVDO0FBV3ZDLElBQUksT0FBMkIsQ0FBQztBQUNoQyxJQUFJLGFBQTRCLENBQUM7QUFDakMsSUFBSSxZQUEwQixDQUFDO0FBRS9CLE1BQWEsZUFBZ0IsU0FBUSxzQkFBUztJQUcxQyxZQUFZLEtBQWdCLEVBQUUsRUFBVSxFQUFFLEtBQWtCO1FBQ3hELEtBQUssQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFFakIsd0hBQXdIO1FBQ3hILE1BQU0sVUFBVSxHQUFHLElBQUksY0FBSSxDQUFDLElBQUksRUFBRSxlQUFlLEVBQUU7WUFDL0MsU0FBUyxFQUFFLElBQUksMEJBQWdCLENBQUMsbUJBQW1CLENBQUM7WUFDcEQsY0FBYyxFQUFFO2dCQUNaLENBQUMsaUJBQWlCLENBQUMsRUFBRSxJQUFJLHdCQUFjLENBQUM7b0JBQ3BDLFVBQVUsRUFBRTt3QkFDUixJQUFJLHlCQUFlLENBQUM7NEJBQ2hCLFNBQVMsRUFBRSxDQUFDLEdBQUcsQ0FBQzs0QkFDaEIsT0FBTyxFQUFFLENBQUMseUJBQXlCLENBQUM7eUJBQ3ZDLENBQUM7cUJBQ0w7aUJBQ0osQ0FBQzthQUNMO1lBQ0QsZUFBZSxFQUFFO2dCQUNiLHVCQUFhLENBQUMsd0JBQXdCLENBQUMsOEJBQThCLENBQUM7Z0JBQ3RFLHVCQUFhLENBQUMsd0JBQXdCLENBQUMsNkJBQTZCLENBQUM7YUFDeEU7U0FDSixDQUFDLENBQUM7UUFFSCxNQUFNLFFBQVEsR0FBRyxrQkFBUSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBRXJDLDJEQUEyRDtRQUMzRCxRQUFRLENBQUMsV0FBVyxDQUNoQixlQUFlLEVBQ2YscUZBQXFGLEVBQ3JGLGtFQUFrRSxFQUNsRSxpRkFBaUYsRUFDakYsOEJBQThCLEVBQzlCLDZCQUE2QixFQUM3QixpQkFBaUIsRUFDakIsMkJBQTJCLEVBQzNCLG9DQUFvQyxFQUNwQyxxQ0FBcUMsRUFDckMscUNBQXFDLENBQ3hDLENBQUM7UUFFRixzR0FBc0c7UUFDdEcsTUFBTSx3QkFBd0IsR0FBRyxJQUFJLHVCQUFhLENBQzlDLElBQUksRUFDSiwwQkFBMEIsRUFDMUIsRUFBRSxHQUFHLEVBQUUsS0FBSyxDQUFDLEdBQUcsRUFBRSxnQkFBZ0IsRUFBRSxJQUFJLEVBQUUsQ0FDN0MsQ0FBQztRQUVGLGdGQUFnRjtRQUNoRixJQUFJLEtBQUssQ0FBQyxPQUFPLElBQUksT0FBTyxFQUFFO1lBQzFCLE9BQU8sR0FBRyw0QkFBa0IsQ0FBQyxNQUFNLENBQUM7WUFDcEMsYUFBYSxHQUFHLHVCQUFhLENBQUMsR0FBRyxDQUFDO1NBQ3JDO2FBQU07WUFDSCxPQUFPLEdBQUcsNEJBQWtCLENBQUMsTUFBTSxDQUFDO1lBQ3BDLGFBQWEsR0FBRyx1QkFBYSxDQUFDLEVBQUUsQ0FBQztTQUNwQztRQUVELGtFQUFrRTtRQUNsRSxRQUFRLEtBQUssQ0FBQyxZQUFZLEVBQUU7WUFDeEIsS0FBSyxPQUFPO2dCQUNSLFlBQVksR0FBRyxzQkFBWSxDQUFDLEtBQUssQ0FBQztnQkFDbEMsTUFBTTtZQUNWLEtBQUssT0FBTztnQkFDUixZQUFZLEdBQUcsc0JBQVksQ0FBQyxLQUFLLENBQUM7Z0JBQ2xDLE1BQU07WUFDVixLQUFLLFFBQVE7Z0JBQ1QsWUFBWSxHQUFHLHNCQUFZLENBQUMsTUFBTSxDQUFDO2dCQUNuQyxNQUFNO1lBQ1YsS0FBSyxTQUFTO2dCQUNWLFlBQVksR0FBRyxzQkFBWSxDQUFDLE9BQU8sQ0FBQztnQkFDcEMsTUFBTTtZQUNWLEtBQUssU0FBUztnQkFDVixZQUFZLEdBQUcsc0JBQVksQ0FBQyxPQUFPLENBQUM7Z0JBQ3BDLE1BQU07WUFDVixLQUFLLFFBQVE7Z0JBQ1QsWUFBWSxHQUFHLHNCQUFZLENBQUMsTUFBTSxDQUFDO2dCQUNuQyxNQUFNO1lBQ1Y7Z0JBQ0ksWUFBWSxHQUFHLHNCQUFZLENBQUMsS0FBSyxDQUFDO1NBQ3pDO1FBRUQsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLGtCQUFRLENBQUMsSUFBSSxFQUFFLGNBQWMsRUFBRTtZQUMvQyxHQUFHLEVBQUUsS0FBSyxDQUFDLEdBQUc7WUFDZCxJQUFJLEVBQUUsVUFBVTtZQUNoQixhQUFhLEVBQUUsd0JBQXdCO1lBQ3ZDLFlBQVksRUFBRSxzQkFBWSxDQUFDLEVBQUUsQ0FBQyxhQUFhLEVBQUUsWUFBWSxDQUFDO1lBQzFELFlBQVksRUFBRSxzQkFBWSxDQUFDLHFCQUFxQixDQUFDO2dCQUM3QyxlQUFlLEVBQUUsS0FBSztnQkFDdEIsT0FBTyxFQUFFLE9BQU87YUFDbkIsQ0FBQztZQUNGLGlDQUFpQztZQUNqQyxPQUFPLEVBQUUsbUJBQW1CO1lBQzVCLFFBQVEsRUFBRSxRQUFRO1NBQ3JCLENBQUMsQ0FBQztRQUVILGlEQUFpRDtRQUNqRCxJQUFJLENBQUMsUUFBUSxDQUFDLGdCQUFnQixDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO0lBQzNELENBQUM7Q0FDSjtBQW5HRCwwQ0FtR0MiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBlc2xpbnQtZGlzYWJsZSBpbXBvcnQvbm8tZXh0cmFuZW91cy1kZXBlbmRlbmNpZXMgKi9cbmltcG9ydCB7IFJlbW92YWxQb2xpY3ksIER1cmF0aW9uLCBTdGFjayB9IGZyb20gJ2F3cy1jZGstbGliJztcbmltcG9ydCB7XG4gICAgVnBjLFxuICAgIFNlY3VyaXR5R3JvdXAsXG4gICAgSW5zdGFuY2UsXG4gICAgSW5zdGFuY2VUeXBlLFxuICAgIEluc3RhbmNlQ2xhc3MsXG4gICAgSW5zdGFuY2VTaXplLFxuICAgIENsb3VkRm9ybWF0aW9uSW5pdCxcbiAgICBJbml0Q29uZmlnLFxuICAgIEluaXRGaWxlLFxuICAgIEluaXRDb21tYW5kLFxuICAgIFVzZXJEYXRhLFxuICAgIE1hY2hpbmVJbWFnZSxcbiAgICBBbWF6b25MaW51eENwdVR5cGUsXG59IGZyb20gJ2F3cy1jZGstbGliL2F3cy1lYzInO1xuaW1wb3J0IHtcbiAgICBSb2xlLFxuICAgIFNlcnZpY2VQcmluY2lwYWwsXG4gICAgTWFuYWdlZFBvbGljeSxcbiAgICBQb2xpY3lEb2N1bWVudCxcbiAgICBQb2xpY3lTdGF0ZW1lbnQsXG59IGZyb20gJ2F3cy1jZGstbGliL2F3cy1pYW0nO1xuaW1wb3J0IHsgQnVja2V0LCBPYmplY3RPd25lcnNoaXAgfSBmcm9tICdhd3MtY2RrLWxpYi9hd3MtczMnO1xuaW1wb3J0IHsgU291cmNlLCBCdWNrZXREZXBsb3ltZW50IH0gZnJvbSAnYXdzLWNkay1saWIvYXdzLXMzLWRlcGxveW1lbnQnO1xuaW1wb3J0IHsgQ29uc3RydWN0IH0gZnJvbSAnY29uc3RydWN0cyc7XG5cbmludGVyZmFjZSBTZXJ2ZXJQcm9wcyB7XG4gICAgdnBjOiBWcGM7XG4gICAgc3NoU2VjdXJpdHlHcm91cDogU2VjdXJpdHlHcm91cDtcbiAgICBsb2dMZXZlbDogc3RyaW5nO1xuICAgIHNzaFB1YktleTogc3RyaW5nO1xuICAgIGNwdVR5cGU6IHN0cmluZztcbiAgICBpbnN0YW5jZVNpemU6IHN0cmluZztcbn1cblxubGV0IGNwdVR5cGU6IEFtYXpvbkxpbnV4Q3B1VHlwZTtcbmxldCBpbnN0YW5jZUNsYXNzOiBJbnN0YW5jZUNsYXNzO1xubGV0IGluc3RhbmNlU2l6ZTogSW5zdGFuY2VTaXplO1xuXG5leHBvcnQgY2xhc3MgU2VydmVyUmVzb3VyY2VzIGV4dGVuZHMgQ29uc3RydWN0IHtcbiAgICBwdWJsaWMgaW5zdGFuY2U6IEluc3RhbmNlO1xuXG4gICAgY29uc3RydWN0b3Ioc2NvcGU6IENvbnN0cnVjdCwgaWQ6IHN0cmluZywgcHJvcHM6IFNlcnZlclByb3BzKSB7XG4gICAgICAgIHN1cGVyKHNjb3BlLCBpZCk7XG5cbiAgICAgICAgLy8gQ3JlYXRlIGEgcm9sZSBmb3IgdGhlIEVDMiBpbnN0YW5jZSB0byBhc3N1bWUuICBUaGlzIHJvbGUgd2lsbCBhbGxvdyB0aGUgaW5zdGFuY2UgdG8gcHV0IGxvZyBldmVudHMgdG8gQ2xvdWRXYXRjaCBMb2dzXG4gICAgICAgIGNvbnN0IHNlcnZlclJvbGUgPSBuZXcgUm9sZSh0aGlzLCAnc2VydmVyRWMyUm9sZScsIHtcbiAgICAgICAgICAgIGFzc3VtZWRCeTogbmV3IFNlcnZpY2VQcmluY2lwYWwoJ2VjMi5hbWF6b25hd3MuY29tJyksXG4gICAgICAgICAgICBpbmxpbmVQb2xpY2llczoge1xuICAgICAgICAgICAgICAgIFsnUmV0ZW50aW9uUG9saWN5J106IG5ldyBQb2xpY3lEb2N1bWVudCh7XG4gICAgICAgICAgICAgICAgICAgIHN0YXRlbWVudHM6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ldyBQb2xpY3lTdGF0ZW1lbnQoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc291cmNlczogWycqJ10sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uczogWydsb2dzOlB1dFJldGVudGlvblBvbGljeSddLFxuICAgICAgICAgICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgbWFuYWdlZFBvbGljaWVzOiBbXG4gICAgICAgICAgICAgICAgTWFuYWdlZFBvbGljeS5mcm9tQXdzTWFuYWdlZFBvbGljeU5hbWUoJ0FtYXpvblNTTU1hbmFnZWRJbnN0YW5jZUNvcmUnKSxcbiAgICAgICAgICAgICAgICBNYW5hZ2VkUG9saWN5LmZyb21Bd3NNYW5hZ2VkUG9saWN5TmFtZSgnQ2xvdWRXYXRjaEFnZW50U2VydmVyUG9saWN5JyksXG4gICAgICAgICAgICBdLFxuICAgICAgICB9KTtcblxuICAgICAgICBjb25zdCB1c2VyRGF0YSA9IFVzZXJEYXRhLmZvckxpbnV4KCk7XG5cbiAgICAgICAgLy8gQWRkIHVzZXIgZGF0YSB0aGF0IGlzIHVzZWQgdG8gY29uZmlndXJlIHRoZSBFQzIgaW5zdGFuY2VcbiAgICAgICAgdXNlckRhdGEuYWRkQ29tbWFuZHMoXG4gICAgICAgICAgICAneXVtIHVwZGF0ZSAteScsXG4gICAgICAgICAgICAnY3VybCAtc0wgaHR0cHM6Ly9kbC55YXJucGtnLmNvbS9ycG0veWFybi5yZXBvIHwgc3VkbyB0ZWUgL2V0Yy95dW0ucmVwb3MuZC95YXJuLnJlcG8nLFxuICAgICAgICAgICAgJ2N1cmwgLXNMIGh0dHBzOi8vcnBtLm5vZGVzb3VyY2UuY29tL3NldHVwXzIwLnggfCBzdWRvIC1FIGJhc2ggLSAnLFxuICAgICAgICAgICAgJ3l1bSBpbnN0YWxsIC15IGFtYXpvbi1jbG91ZHdhdGNoLWFnZW50IG5vZGVqcyBweXRob24zLXBpcCB6aXAgdW56aXAgZG9ja2VyIHlhcm4nLFxuICAgICAgICAgICAgJ3N1ZG8gc3lzdGVtY3RsIGVuYWJsZSBkb2NrZXInLFxuICAgICAgICAgICAgJ3N1ZG8gc3lzdGVtY3RsIHN0YXJ0IGRvY2tlcicsXG4gICAgICAgICAgICAnc3VkbyBkbmYgdXBkYXRlJyxcbiAgICAgICAgICAgICdzdWRvIGRuZiBpbnN0YWxsIC15IG5naW54JyxcbiAgICAgICAgICAgICdzdWRvIHN5c3RlbWN0bCBzdGFydCBuZ2lueC5zZXJ2aWNlJyxcbiAgICAgICAgICAgICdzdWRvIHN5c3RlbWN0bCBzdGF0dXMgbmdpbnguc2VydmljZScsXG4gICAgICAgICAgICAnc3VkbyBzeXN0ZW1jdGwgZW5hYmxlIG5naW54LnNlcnZpY2UnLFxuICAgICAgICApO1xuXG4gICAgICAgIC8vIENyZWF0ZSBhIFNlY3VyaXR5IEdyb3VwIGZvciB0aGUgRUMyIGluc3RhbmNlLiAgVGhpcyBncm91cCB3aWxsIGFsbG93IFNTSCBhY2Nlc3MgdG8gdGhlIEVDMiBpbnN0YW5jZVxuICAgICAgICBjb25zdCBlYzJJbnN0YW5jZVNlY3VyaXR5R3JvdXAgPSBuZXcgU2VjdXJpdHlHcm91cChcbiAgICAgICAgICAgIHRoaXMsXG4gICAgICAgICAgICAnZWMySW5zdGFuY2VTZWN1cml0eUdyb3VwJyxcbiAgICAgICAgICAgIHsgdnBjOiBwcm9wcy52cGMsIGFsbG93QWxsT3V0Ym91bmQ6IHRydWUgfSxcbiAgICAgICAgKTtcblxuICAgICAgICAvLyBEZXRlcm1pbmUgdGhlIGNvcnJlY3QgQ1BVVHlwZSBhbmQgSW5zdGFuY2UgQ2xhc3MgYmFzZWQgb24gdGhlIHByb3BzIHBhc3NlZCBpblxuICAgICAgICBpZiAocHJvcHMuY3B1VHlwZSA9PSAnQVJNNjQnKSB7XG4gICAgICAgICAgICBjcHVUeXBlID0gQW1hem9uTGludXhDcHVUeXBlLkFSTV82NDtcbiAgICAgICAgICAgIGluc3RhbmNlQ2xhc3MgPSBJbnN0YW5jZUNsYXNzLk03RztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNwdVR5cGUgPSBBbWF6b25MaW51eENwdVR5cGUuWDg2XzY0O1xuICAgICAgICAgICAgaW5zdGFuY2VDbGFzcyA9IEluc3RhbmNlQ2xhc3MuVDI7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBEZXRlcm1pbmUgdGhlIGNvcnJlY3QgSW5zdGFuY2VTaXplIGJhc2VkIG9uIHRoZSBwcm9wcyBwYXNzZWQgaW5cbiAgICAgICAgc3dpdGNoIChwcm9wcy5pbnN0YW5jZVNpemUpIHtcbiAgICAgICAgICAgIGNhc2UgJ21pY3JvJzpcbiAgICAgICAgICAgICAgICBpbnN0YW5jZVNpemUgPSBJbnN0YW5jZVNpemUuTUlDUk87XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdsYXJnZSc6XG4gICAgICAgICAgICAgICAgaW5zdGFuY2VTaXplID0gSW5zdGFuY2VTaXplLkxBUkdFO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAneGxhcmdlJzpcbiAgICAgICAgICAgICAgICBpbnN0YW5jZVNpemUgPSBJbnN0YW5jZVNpemUuWExBUkdFO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAneGxhcmdlMic6XG4gICAgICAgICAgICAgICAgaW5zdGFuY2VTaXplID0gSW5zdGFuY2VTaXplLlhMQVJHRTI7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICd4bGFyZ2U0JzpcbiAgICAgICAgICAgICAgICBpbnN0YW5jZVNpemUgPSBJbnN0YW5jZVNpemUuWExBUkdFNDtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ21lZGl1bSc6XG4gICAgICAgICAgICAgICAgaW5zdGFuY2VTaXplID0gSW5zdGFuY2VTaXplLk1FRElVTTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgaW5zdGFuY2VTaXplID0gSW5zdGFuY2VTaXplLkxBUkdFO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5pbnN0YW5jZSA9IG5ldyBJbnN0YW5jZSh0aGlzLCAnd2ViYXBwU2VydmVyJywge1xuICAgICAgICAgICAgdnBjOiBwcm9wcy52cGMsXG4gICAgICAgICAgICByb2xlOiBzZXJ2ZXJSb2xlLFxuICAgICAgICAgICAgc2VjdXJpdHlHcm91cDogZWMySW5zdGFuY2VTZWN1cml0eUdyb3VwLFxuICAgICAgICAgICAgaW5zdGFuY2VUeXBlOiBJbnN0YW5jZVR5cGUub2YoaW5zdGFuY2VDbGFzcywgaW5zdGFuY2VTaXplKSxcbiAgICAgICAgICAgIG1hY2hpbmVJbWFnZTogTWFjaGluZUltYWdlLmxhdGVzdEFtYXpvbkxpbnV4MjAyMyh7XG4gICAgICAgICAgICAgICAgY2FjaGVkSW5Db250ZXh0OiBmYWxzZSxcbiAgICAgICAgICAgICAgICBjcHVUeXBlOiBjcHVUeXBlLFxuICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAvLyBTaG91bGQgaW5wdXQgeW91ciBlYzIga2V5IGhlcmVcbiAgICAgICAgICAgIGtleU5hbWU6ICd2dWlsZW5kaS1mdW5kLWVjMicsXG4gICAgICAgICAgICB1c2VyRGF0YTogdXNlckRhdGEsXG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIEFkZCB0aGUgU1NIIFNlY3VyaXR5IEdyb3VwIHRvIHRoZSBFQzIgaW5zdGFuY2VcbiAgICAgICAgdGhpcy5pbnN0YW5jZS5hZGRTZWN1cml0eUdyb3VwKHByb3BzLnNzaFNlY3VyaXR5R3JvdXApO1xuICAgIH1cbn0iXX0=