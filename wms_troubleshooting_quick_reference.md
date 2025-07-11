# Georg Fischer WMS Troubleshooting Quick Reference

## Emergency Contact Information
- **System Administrator**: [Contact Info]
- **Technical Support**: [Contact Info]
- **Facility Management**: [Contact Info]
- **Emergency Services**: [Contact Info]

## Common Error Codes and Solutions

### Communication Errors

#### Error Code: 10003 - Communication Fault to Device
**Description**: Communication disruption between WMS and equipment
**Immediate Actions**:
1. Check network connections
2. Verify device power status
3. Restart communication protocols
4. Contact technical support if persistent

**Resolution Steps**:
- Send transport command again to device
- Check device manager status
- Verify network connectivity
- Document incident in system journal

#### Error Code: 10045 - Communication Protocol Problem
**Description**: Device-specific communication protocol error
**Immediate Actions**:
1. Stop transport operations to affected device
2. Check protocol configuration
3. Restart device communication
4. Monitor for recurring issues

### Transport and Movement Errors

#### Error Code: 10024 - Target Unreachable
**Description**: Non-moveable device or long-term disrupted location blocks path
**Immediate Actions**:
1. Identify blocked equipment
2. Check alternative routes
3. Clear obstruction if safe
4. Reroute transports as necessary

**Resolution Steps**:
- Reset transport commands
- Use manual override if available
- Clear path obstructions
- Update system routing

#### Error Code: 10039 - Timeout Position Occupancy
**Description**: Position occupancy timeout exceeded
**Immediate Actions**:
1. Check physical position status
2. Verify sensor functionality
3. Clear position if safe
4. Reset position status in system

### Container Handling Errors

#### Error Code: 10004 - Target Compartment Occupied on Delivery
**Description**: Destination location is occupied when attempting delivery
**Immediate Actions**:
1. Verify compartment status physically
2. Check for phantom inventory
3. Find alternative location
4. Correct inventory data if necessary

#### Error Code: 10005 - Source Compartment Not Occupied on Pickup
**Description**: Expected item not found at pickup location
**Immediate Actions**:
1. Verify location contents physically
2. Check inventory accuracy
3. Search nearby locations
4. Update inventory records

#### Error Code: 10006 - Contour Error (Oversized/Overweight)
**Description**: Item exceeds size or weight limits
**Immediate Actions**:
1. Verify item dimensions/weight
2. Check system parameters
3. Use manual handling if necessary
4. Update item master data

### Load Carrier Errors

#### Error Code: 10007 - Load Carrier Occupied Before Pickup
**Description**: Load carrier position blocked before pickup attempt
**Immediate Actions**:
1. Clear load carrier position
2. Check for stuck items
3. Verify sensor functionality
4. Manual intervention if safe

#### Error Code: 10008 - Load Carrier Free Before Delivery
**Description**: Load carrier position unexpectedly empty before delivery
**Immediate Actions**:
1. Locate missing load carrier
2. Check system tracking
3. Verify position sensors
4. Update carrier status

### Quality and Safety Errors

#### Error Code: 20018 - Actual Occupancy > Target Occupancy
**Description**: More items than expected in location
**Immediate Actions**:
1. Count items physically
2. Verify inventory records
3. Correct counts in system
4. Investigate root cause

#### Error Code: 20019 - Target Compartment Too Small
**Description**: Item won't fit in assigned location
**Immediate Actions**:
1. Find larger suitable location
2. Update location parameters
3. Adjust item storage rules
4. Manual placement if necessary

## Fault Resolution Procedures

### Standard Resolution Options

1. **Send Transport to Device Again**
   - Use when communication temporarily failed
   - Monitor for successful completion
   - Document retry attempts

2. **Book Load Carrier Externally**
   - Use for tracking corrections
   - Requires administrative privileges
   - Update all related records

3. **Complete Transport**
   - Use when transport physically completed
   - System needs status update
   - Verify completion accuracy

4. **Send Quit to Device**
   - Cancels current device operation
   - Use with caution
   - Requires restart of operation

5. **Delete Fault**
   - Removes fault from system
   - Use only after resolution
   - Document resolution method

6. **Reset Transport**
   - Returns transport to initial state
   - Use for restart scenarios
   - Check prerequisites

7. **Cancel Transport**
   - Permanently cancels operation
   - Use as last resort
   - Document cancellation reason

### Fault Resolution Assistant

**Access**: System menu → Fault Management → Resolution Assistant

**Use When**:
- Multiple resolution options available
- Unsure of best approach
- Need guided troubleshooting
- Complex fault scenarios

**Process**:
1. Select fault from list
2. Follow assistant prompts
3. Execute recommended actions
4. Verify resolution
5. Document outcome

## Emergency Procedures

### System Emergency Shutdown
1. **Immediate Actions**:
   - Press emergency stop if available
   - Clear personnel from automated areas
   - Contact facility management
   - Document incident

2. **Recovery Process**:
   - Verify area safety
   - Check equipment status
   - Restart systems systematically
   - Test all functions before full operation

### Communication System Failure
1. **Immediate Actions**:
   - Switch to manual operations
   - Notify all operators
   - Contact technical support
   - Document affected systems

2. **Backup Procedures**:
   - Use paper-based tracking
   - Coordinate manually between areas
   - Maintain safety protocols
   - Prepare for system recovery

### Equipment Malfunction
1. **Safety First**:
   - Isolate affected equipment
   - Clear personnel from danger zones
   - Secure area if necessary
   - Call emergency services if required

2. **System Response**:
   - Reroute operations around fault
   - Update system routing
   - Notify maintenance team
   - Document equipment status

## Preventive Measures

### Daily Checks
- Verify system communications
- Check equipment status lights
- Review overnight error logs
- Test critical functions

### Weekly Maintenance
- Clean sensors and readers
- Check mechanical systems
- Review system performance
- Update documentation

### Monthly Reviews
- Analyze fault trends
- Update procedures
- Train on new scenarios
- Review emergency protocols

## Performance Monitoring

### Key Indicators
- Communication error frequency
- Transport completion rates
- Equipment availability
- Fault resolution times

### Alert Thresholds
- Communication errors > 5% per hour
- Transport failures > 2% per shift
- Equipment downtime > 10 minutes
- Unresolved faults > 30 minutes

### Escalation Procedures
1. **Level 1**: Operator response (0-5 minutes)
2. **Level 2**: Supervisor involvement (5-15 minutes)
3. **Level 3**: Technical support (15-30 minutes)
4. **Level 4**: Management escalation (30+ minutes)

## Documentation Requirements

### Incident Reporting
- Fault code and description
- Time of occurrence
- Actions taken
- Resolution method
- Time to resolution
- Root cause analysis

### Log Maintenance
- Keep detailed system logs
- Regular backup procedures
- Archive old records
- Maintain fault databases

---

## Quick Action Checklist

### Before Calling Support
- [ ] Note exact error code
- [ ] Check related equipment
- [ ] Try standard resolution steps
- [ ] Document all actions taken
- [ ] Gather system logs

### During Emergency
- [ ] Ensure personnel safety
- [ ] Isolate affected systems
- [ ] Contact appropriate support
- [ ] Document incident details
- [ ] Communicate with team

### After Resolution
- [ ] Verify system operation
- [ ] Update documentation
- [ ] Review root cause
- [ ] Implement preventive measures
- [ ] Share lessons learned

---

*This quick reference should be posted at each workstation and included in operator training materials. Regular updates ensure accuracy with system changes.*