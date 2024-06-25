"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NodejsAwsCdkAwsCostDemoStack = void 0;
const cdk = require("aws-cdk-lib");
// import * as sqs from 'aws-cdk-lib/aws-sqs';
class NodejsAwsCdkAwsCostDemoStack extends cdk.Stack {
    constructor(scope, id, props) {
        super(scope, id, props);
        // The code that defines your stack goes here
        // example resource
        // const queue = new sqs.Queue(this, 'NodejsAwsCdkAwsCostDemoQueue', {
        //   visibilityTimeout: cdk.Duration.seconds(300)
        // });
    }
}
exports.NodejsAwsCdkAwsCostDemoStack = NodejsAwsCdkAwsCostDemoStack;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm9kZWpzX2F3cy1jZGtfYXdzLWNvc3QtZGVtby1zdGFjay5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm5vZGVqc19hd3MtY2RrX2F3cy1jb3N0LWRlbW8tc3RhY2sudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsbUNBQW1DO0FBRW5DLDhDQUE4QztBQUU5QyxNQUFhLDRCQUE2QixTQUFRLEdBQUcsQ0FBQyxLQUFLO0lBQ3pELFlBQVksS0FBZ0IsRUFBRSxFQUFVLEVBQUUsS0FBc0I7UUFDOUQsS0FBSyxDQUFDLEtBQUssRUFBRSxFQUFFLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFFeEIsNkNBQTZDO1FBRTdDLG1CQUFtQjtRQUNuQixzRUFBc0U7UUFDdEUsaURBQWlEO1FBQ2pELE1BQU07SUFDUixDQUFDO0NBQ0Y7QUFYRCxvRUFXQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIGNkayBmcm9tICdhd3MtY2RrLWxpYic7XG5pbXBvcnQgeyBDb25zdHJ1Y3QgfSBmcm9tICdjb25zdHJ1Y3RzJztcbi8vIGltcG9ydCAqIGFzIHNxcyBmcm9tICdhd3MtY2RrLWxpYi9hd3Mtc3FzJztcblxuZXhwb3J0IGNsYXNzIE5vZGVqc0F3c0Nka0F3c0Nvc3REZW1vU3RhY2sgZXh0ZW5kcyBjZGsuU3RhY2sge1xuICBjb25zdHJ1Y3RvcihzY29wZTogQ29uc3RydWN0LCBpZDogc3RyaW5nLCBwcm9wcz86IGNkay5TdGFja1Byb3BzKSB7XG4gICAgc3VwZXIoc2NvcGUsIGlkLCBwcm9wcyk7XG5cbiAgICAvLyBUaGUgY29kZSB0aGF0IGRlZmluZXMgeW91ciBzdGFjayBnb2VzIGhlcmVcblxuICAgIC8vIGV4YW1wbGUgcmVzb3VyY2VcbiAgICAvLyBjb25zdCBxdWV1ZSA9IG5ldyBzcXMuUXVldWUodGhpcywgJ05vZGVqc0F3c0Nka0F3c0Nvc3REZW1vUXVldWUnLCB7XG4gICAgLy8gICB2aXNpYmlsaXR5VGltZW91dDogY2RrLkR1cmF0aW9uLnNlY29uZHMoMzAwKVxuICAgIC8vIH0pO1xuICB9XG59XG4iXX0=