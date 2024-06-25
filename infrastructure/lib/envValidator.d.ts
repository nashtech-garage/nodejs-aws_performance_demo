import { EC2WebAppProps } from './ec2-instance';
export declare enum InstanceSize {
    'MICRO' = "micro",
    'LARGE' = "large",
    'MEDIUM' = "medium",
    'XLARGE' = "xlarge",
    'XLARGE2' = "xlarge2",
    'XLARGE4' = "xlarge4"
}
export declare enum CPUTypes {
    'X86' = "x86",
    'ARM64' = "arm64"
}
export declare function envValidator(props: EC2WebAppProps): void;
