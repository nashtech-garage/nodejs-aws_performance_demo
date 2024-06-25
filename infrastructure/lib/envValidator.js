"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.envValidator = exports.CPUTypes = exports.InstanceSize = void 0;
var InstanceSize;
(function (InstanceSize) {
    InstanceSize["MICRO"] = "micro";
    InstanceSize["LARGE"] = "large";
    InstanceSize["MEDIUM"] = "medium";
    InstanceSize["XLARGE"] = "xlarge";
    InstanceSize["XLARGE2"] = "xlarge2";
    InstanceSize["XLARGE4"] = "xlarge4";
})(InstanceSize || (exports.InstanceSize = InstanceSize = {}));
var CPUTypes;
(function (CPUTypes) {
    CPUTypes["X86"] = "x86";
    CPUTypes["ARM64"] = "arm64";
})(CPUTypes || (exports.CPUTypes = CPUTypes = {}));
function envValidator(props) {
    const validCpuTypes = Object.keys(CPUTypes).join(', ');
    if (props.cpuType) {
        if (props.cpuType !== 'X86' && props.cpuType !== 'ARM64') {
            throw new Error(`Invalid CPU type.  Valid CPU Types are ${validCpuTypes}`);
        }
    }
    if (props.instanceSize) {
        const validSizes = Object.keys(InstanceSize).join(', ');
        if (!Object.values(InstanceSize).includes(props.instanceSize.toLowerCase())) {
            throw new Error(`Invalid instance size. Valid sizes are: ${validSizes}`);
        }
    }
}
exports.envValidator = envValidator;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW52VmFsaWRhdG9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZW52VmFsaWRhdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUVBLElBQVksWUFPWDtBQVBELFdBQVksWUFBWTtJQUN0QiwrQkFBaUIsQ0FBQTtJQUNqQiwrQkFBaUIsQ0FBQTtJQUNqQixpQ0FBbUIsQ0FBQTtJQUNuQixpQ0FBbUIsQ0FBQTtJQUNuQixtQ0FBcUIsQ0FBQTtJQUNyQixtQ0FBcUIsQ0FBQTtBQUN2QixDQUFDLEVBUFcsWUFBWSw0QkFBWixZQUFZLFFBT3ZCO0FBQ0QsSUFBWSxRQUdYO0FBSEQsV0FBWSxRQUFRO0lBQ2xCLHVCQUFhLENBQUE7SUFDYiwyQkFBaUIsQ0FBQTtBQUNuQixDQUFDLEVBSFcsUUFBUSx3QkFBUixRQUFRLFFBR25CO0FBRUQsU0FBZ0IsWUFBWSxDQUFDLEtBQXFCO0lBQ2hELE1BQU0sYUFBYSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3ZELElBQUksS0FBSyxDQUFDLE9BQU8sRUFBRTtRQUNqQixJQUFJLEtBQUssQ0FBQyxPQUFPLEtBQUssS0FBSyxJQUFJLEtBQUssQ0FBQyxPQUFPLEtBQUssT0FBTyxFQUFFO1lBQ3hELE1BQU0sSUFBSSxLQUFLLENBQ2IsMENBQTBDLGFBQWEsRUFBRSxDQUMxRCxDQUFDO1NBQ0g7S0FDRjtJQUVELElBQUksS0FBSyxDQUFDLFlBQVksRUFBRTtRQUN0QixNQUFNLFVBQVUsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN4RCxJQUNFLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQyxRQUFRLENBQ25DLEtBQUssQ0FBQyxZQUFZLENBQUMsV0FBVyxFQUFrQixDQUNqRCxFQUNEO1lBQ0EsTUFBTSxJQUFJLEtBQUssQ0FBQywyQ0FBMkMsVUFBVSxFQUFFLENBQUMsQ0FBQztTQUMxRTtLQUNGO0FBQ0gsQ0FBQztBQXBCRCxvQ0FvQkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBFQzJXZWJBcHBQcm9wcyB9IGZyb20gJy4vZWMyLWluc3RhbmNlJztcblxuZXhwb3J0IGVudW0gSW5zdGFuY2VTaXplIHtcbiAgJ01JQ1JPJyA9ICdtaWNybycsXG4gICdMQVJHRScgPSAnbGFyZ2UnLFxuICAnTUVESVVNJyA9ICdtZWRpdW0nLFxuICAnWExBUkdFJyA9ICd4bGFyZ2UnLFxuICAnWExBUkdFMicgPSAneGxhcmdlMicsXG4gICdYTEFSR0U0JyA9ICd4bGFyZ2U0Jyxcbn1cbmV4cG9ydCBlbnVtIENQVVR5cGVzIHtcbiAgJ1g4NicgPSAneDg2JyxcbiAgJ0FSTTY0JyA9ICdhcm02NCcsXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBlbnZWYWxpZGF0b3IocHJvcHM6IEVDMldlYkFwcFByb3BzKSB7XG4gIGNvbnN0IHZhbGlkQ3B1VHlwZXMgPSBPYmplY3Qua2V5cyhDUFVUeXBlcykuam9pbignLCAnKTtcbiAgaWYgKHByb3BzLmNwdVR5cGUpIHtcbiAgICBpZiAocHJvcHMuY3B1VHlwZSAhPT0gJ1g4NicgJiYgcHJvcHMuY3B1VHlwZSAhPT0gJ0FSTTY0Jykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICBgSW52YWxpZCBDUFUgdHlwZS4gIFZhbGlkIENQVSBUeXBlcyBhcmUgJHt2YWxpZENwdVR5cGVzfWAsXG4gICAgICApO1xuICAgIH1cbiAgfVxuXG4gIGlmIChwcm9wcy5pbnN0YW5jZVNpemUpIHtcbiAgICBjb25zdCB2YWxpZFNpemVzID0gT2JqZWN0LmtleXMoSW5zdGFuY2VTaXplKS5qb2luKCcsICcpO1xuICAgIGlmIChcbiAgICAgICFPYmplY3QudmFsdWVzKEluc3RhbmNlU2l6ZSkuaW5jbHVkZXMoXG4gICAgICAgIHByb3BzLmluc3RhbmNlU2l6ZS50b0xvd2VyQ2FzZSgpIGFzIEluc3RhbmNlU2l6ZSxcbiAgICAgIClcbiAgICApIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgSW52YWxpZCBpbnN0YW5jZSBzaXplLiBWYWxpZCBzaXplcyBhcmU6ICR7dmFsaWRTaXplc31gKTtcbiAgICB9XG4gIH1cbn0iXX0=