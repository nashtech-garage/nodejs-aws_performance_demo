"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VPCResources = void 0;
const aws_ec2_1 = require("aws-cdk-lib/aws-ec2");
const constructs_1 = require("constructs");
class VPCResources extends constructs_1.Construct {
    constructor(scope, id) {
        super(scope, id);
        // Create a VPC with public subnets in 2 AZs
        this.vpc = new aws_ec2_1.Vpc(this, 'VPC', {
            natGateways: 0,
            subnetConfiguration: [
                {
                    cidrMask: 24,
                    name: 'ServerPublic',
                    subnetType: aws_ec2_1.SubnetType.PUBLIC,
                    mapPublicIpOnLaunch: true,
                },
            ],
            maxAzs: 2,
        });
        // Create a security group for SSH
        this.sshSecurityGroup = new aws_ec2_1.SecurityGroup(this, 'SSHSecurityGroup', {
            vpc: this.vpc,
            description: 'Security Group for SSH',
            allowAllOutbound: true,
        });
        // Allow SSH inbound traffic on TCP port 22
        this.sshSecurityGroup.addIngressRule(aws_ec2_1.Peer.anyIpv4(), aws_ec2_1.Port.tcp(22));
        this.sshSecurityGroup.addIngressRule(aws_ec2_1.Peer.anyIpv4(), aws_ec2_1.Port.tcp(80), 'Allow HTTP Traffic from any where');
        // Allow run with port 8080
        this.sshSecurityGroup.addIngressRule(aws_ec2_1.Peer.anyIpv4(), aws_ec2_1.Port.tcp(8080), 'Allow Web Next.js run port 8080');
        // Allow run with port 3000
        this.sshSecurityGroup.addIngressRule(aws_ec2_1.Peer.anyIpv4(), aws_ec2_1.Port.tcp(3000), 'Allow Web Nest.js run port 3000');
        this.sshSecurityGroup.addIngressRule(aws_ec2_1.Peer.anyIpv4(), aws_ec2_1.Port.tcp(443), 'Allow HTTPS Traffic from any where');
    }
}
exports.VPCResources = VPCResources;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidnBjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsidnBjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLGlEQU0rQjtBQUM3QiwyQ0FBdUM7QUFFdkMsTUFBYSxZQUFhLFNBQVEsc0JBQVM7SUFJekMsWUFBWSxLQUFnQixFQUFFLEVBQVU7UUFDdEMsS0FBSyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQztRQUVqQiw0Q0FBNEM7UUFDNUMsSUFBSSxDQUFDLEdBQUcsR0FBRyxJQUFJLGFBQUcsQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFO1lBQzlCLFdBQVcsRUFBRSxDQUFDO1lBQ2QsbUJBQW1CLEVBQUU7Z0JBQ25CO29CQUNFLFFBQVEsRUFBRSxFQUFFO29CQUNaLElBQUksRUFBRSxjQUFjO29CQUNwQixVQUFVLEVBQUUsb0JBQVUsQ0FBQyxNQUFNO29CQUM3QixtQkFBbUIsRUFBRSxJQUFJO2lCQUMxQjthQUNGO1lBQ0QsTUFBTSxFQUFFLENBQUM7U0FDVixDQUFDLENBQUM7UUFFSCxrQ0FBa0M7UUFDbEMsSUFBSSxDQUFDLGdCQUFnQixHQUFHLElBQUksdUJBQWEsQ0FBQyxJQUFJLEVBQUUsa0JBQWtCLEVBQUU7WUFDbEUsR0FBRyxFQUFFLElBQUksQ0FBQyxHQUFHO1lBQ2IsV0FBVyxFQUFFLHdCQUF3QjtZQUNyQyxnQkFBZ0IsRUFBRSxJQUFJO1NBQ3ZCLENBQUMsQ0FBQztRQUVILDJDQUEyQztRQUMzQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsY0FBYyxDQUFDLGNBQUksQ0FBQyxPQUFPLEVBQUUsRUFBRSxjQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFFbkUsSUFBSSxDQUFDLGdCQUFnQixDQUFDLGNBQWMsQ0FDbEMsY0FBSSxDQUFDLE9BQU8sRUFBRSxFQUNkLGNBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQ1osbUNBQW1DLENBQ3BDLENBQUM7UUFFRiwyQkFBMkI7UUFDM0IsSUFBSSxDQUFDLGdCQUFnQixDQUFDLGNBQWMsQ0FDbEMsY0FBSSxDQUFDLE9BQU8sRUFBRSxFQUNkLGNBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQ2QsaUNBQWlDLENBQ2xDLENBQUM7UUFFRiwyQkFBMkI7UUFDM0IsSUFBSSxDQUFDLGdCQUFnQixDQUFDLGNBQWMsQ0FDbEMsY0FBSSxDQUFDLE9BQU8sRUFBRSxFQUNkLGNBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQ2QsaUNBQWlDLENBQ2xDLENBQUM7UUFFRixJQUFJLENBQUMsZ0JBQWdCLENBQUMsY0FBYyxDQUNsQyxjQUFJLENBQUMsT0FBTyxFQUFFLEVBQ2QsY0FBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFDYixvQ0FBb0MsQ0FDckMsQ0FBQztJQUNKLENBQUM7Q0FDRjtBQXpERCxvQ0F5REMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICAgIFNlY3VyaXR5R3JvdXAsXG4gICAgUGVlcixcbiAgICBQb3J0LFxuICAgIFN1Ym5ldFR5cGUsXG4gICAgVnBjLFxuICB9IGZyb20gJ2F3cy1jZGstbGliL2F3cy1lYzInO1xuICBpbXBvcnQgeyBDb25zdHJ1Y3QgfSBmcm9tICdjb25zdHJ1Y3RzJztcbiAgXG4gIGV4cG9ydCBjbGFzcyBWUENSZXNvdXJjZXMgZXh0ZW5kcyBDb25zdHJ1Y3Qge1xuICAgIHB1YmxpYyBzc2hTZWN1cml0eUdyb3VwOiBTZWN1cml0eUdyb3VwO1xuICAgIHB1YmxpYyB2cGM6IFZwYztcbiAgXG4gICAgY29uc3RydWN0b3Ioc2NvcGU6IENvbnN0cnVjdCwgaWQ6IHN0cmluZykge1xuICAgICAgc3VwZXIoc2NvcGUsIGlkKTtcbiAgXG4gICAgICAvLyBDcmVhdGUgYSBWUEMgd2l0aCBwdWJsaWMgc3VibmV0cyBpbiAyIEFac1xuICAgICAgdGhpcy52cGMgPSBuZXcgVnBjKHRoaXMsICdWUEMnLCB7XG4gICAgICAgIG5hdEdhdGV3YXlzOiAwLFxuICAgICAgICBzdWJuZXRDb25maWd1cmF0aW9uOiBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgY2lkck1hc2s6IDI0LFxuICAgICAgICAgICAgbmFtZTogJ1NlcnZlclB1YmxpYycsXG4gICAgICAgICAgICBzdWJuZXRUeXBlOiBTdWJuZXRUeXBlLlBVQkxJQyxcbiAgICAgICAgICAgIG1hcFB1YmxpY0lwT25MYXVuY2g6IHRydWUsXG4gICAgICAgICAgfSxcbiAgICAgICAgXSxcbiAgICAgICAgbWF4QXpzOiAyLFxuICAgICAgfSk7XG4gIFxuICAgICAgLy8gQ3JlYXRlIGEgc2VjdXJpdHkgZ3JvdXAgZm9yIFNTSFxuICAgICAgdGhpcy5zc2hTZWN1cml0eUdyb3VwID0gbmV3IFNlY3VyaXR5R3JvdXAodGhpcywgJ1NTSFNlY3VyaXR5R3JvdXAnLCB7XG4gICAgICAgIHZwYzogdGhpcy52cGMsXG4gICAgICAgIGRlc2NyaXB0aW9uOiAnU2VjdXJpdHkgR3JvdXAgZm9yIFNTSCcsXG4gICAgICAgIGFsbG93QWxsT3V0Ym91bmQ6IHRydWUsXG4gICAgICB9KTtcbiAgXG4gICAgICAvLyBBbGxvdyBTU0ggaW5ib3VuZCB0cmFmZmljIG9uIFRDUCBwb3J0IDIyXG4gICAgICB0aGlzLnNzaFNlY3VyaXR5R3JvdXAuYWRkSW5ncmVzc1J1bGUoUGVlci5hbnlJcHY0KCksIFBvcnQudGNwKDIyKSk7XG4gICAgICBcbiAgICAgIHRoaXMuc3NoU2VjdXJpdHlHcm91cC5hZGRJbmdyZXNzUnVsZShcbiAgICAgICAgUGVlci5hbnlJcHY0KCksXG4gICAgICAgIFBvcnQudGNwKDgwKSxcbiAgICAgICAgJ0FsbG93IEhUVFAgVHJhZmZpYyBmcm9tIGFueSB3aGVyZSdcbiAgICAgICk7XG5cbiAgICAgIC8vIEFsbG93IHJ1biB3aXRoIHBvcnQgODA4MFxuICAgICAgdGhpcy5zc2hTZWN1cml0eUdyb3VwLmFkZEluZ3Jlc3NSdWxlKFxuICAgICAgICBQZWVyLmFueUlwdjQoKSxcbiAgICAgICAgUG9ydC50Y3AoODA4MCksXG4gICAgICAgICdBbGxvdyBXZWIgTmV4dC5qcyBydW4gcG9ydCA4MDgwJ1xuICAgICAgKTtcblxuICAgICAgLy8gQWxsb3cgcnVuIHdpdGggcG9ydCAzMDAwXG4gICAgICB0aGlzLnNzaFNlY3VyaXR5R3JvdXAuYWRkSW5ncmVzc1J1bGUoXG4gICAgICAgIFBlZXIuYW55SXB2NCgpLFxuICAgICAgICBQb3J0LnRjcCgzMDAwKSxcbiAgICAgICAgJ0FsbG93IFdlYiBOZXN0LmpzIHJ1biBwb3J0IDMwMDAnXG4gICAgICApO1xuICBcbiAgICAgIHRoaXMuc3NoU2VjdXJpdHlHcm91cC5hZGRJbmdyZXNzUnVsZShcbiAgICAgICAgUGVlci5hbnlJcHY0KCksXG4gICAgICAgIFBvcnQudGNwKDQ0MyksXG4gICAgICAgICdBbGxvdyBIVFRQUyBUcmFmZmljIGZyb20gYW55IHdoZXJlJ1xuICAgICAgKTtcbiAgICB9XG4gIH0iXX0=