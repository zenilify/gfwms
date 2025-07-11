# Conveyor System Error Guide - Fördertechnik Störungen

## Overview

This document provides detailed troubleshooting procedures for conveyor system (Fördertechnik) errors in the Georg Fischer WMS. For complete documentation, see the [main troubleshooting wiki](wiki.md).

## Error Code Index

| Error Code | Description | Severity | Page Reference |
|------------|-------------|----------|----------------|
| [10003](#10003---kommunikationsstörung-zum-gerät) | Communication error to device | High | [wiki.md#10003](wiki.md#10003---kommunikationsstörung-zum-gerät) |
| [10006](#10006---konturenfehler) | Contour error (size/weight) | Medium | [wiki.md#10006](wiki.md#10006---konturenfehler) |
| [10009](#10009---befristete-annahmesperre) | Temporary acceptance block | Low | [wiki.md#10009](wiki.md#10009---befristete-annahmesperre) |
| [10024](#10024---ziel-unerreichbar) | Destination unreachable | High | [wiki.md#10024](wiki.md#10024---ziel-unerreichbar) |
| [10039](#10039---timeout-platzbelegung) | Timeout space occupancy | Medium | [wiki.md#10039](wiki.md#10039---timeout-platzbelegung) |
| [10045](#10045---protokollfehler) | Protocol error | High | [wiki.md#10045](wiki.md#10045---protokollfehler) |
| [10053](#10053---kein-weg-modelliert) | No path modeled | High | [wiki.md#10053](wiki.md#10053---kein-weg-modelliert) |
| [20162](#20162---te-id-ist-null) | TE-ID is null (No Read) | Medium | [wiki.md#20162](wiki.md#20162---te-id-ist-null-no-read) |

---

## Detailed Error Procedures

### 10003 - Kommunikationsstörung zum Gerät

**🔴 High Priority Communication Error**

**Problem**: Transport cannot be forwarded to device - TCP/IP connection failed

**Immediate Actions**:
1. Check device power status
2. Verify wireless connection
3. Test network connectivity

**Diagnostic Steps**:
```
1. Check device status indicator
2. Verify Access Point connection
3. Test ping to device IP
4. Check wireless signal strength
5. Review network logs
```

**Solutions**:
- **Hardware restart**: Power cycle device ('Strom aus' → 'Strom ein')
- **Manual positioning**: Move device to restore wireless connection
- **Network troubleshooting**: Contact IT department for network issues

**WMS Actions**: Standard transport retry after hardware resolution

**Prevention**: Regular wireless infrastructure maintenance

📖 **Reference**: [Main Wiki Section](wiki.md#10003---kommunikationsstörung-zum-gerät) | **Original**: stoerungsbehebung.txt:217-235

---

### 10006 - Konturenfehler

**🟡 Medium Priority Dimensional Error**

**Problem**: Load handling module (LHM) exceeds dimensional specifications

**Error Types**:
- Überhöhe (Over-height)
- Überbreite (Over-width) 
- Überlänge (Over-length)
- Übergewicht (Over-weight)

**Immediate Actions**:
1. LHM appears at sorting station
2. Check display panel for specific error
3. Identify which dimension exceeded

**Diagnostic Procedure**:
```
1. Read error details from display panel
2. Measure actual LHM dimensions
3. Compare with system specifications
4. Identify source of dimensional change
```

**Solutions**:
- **Dimension correction**: Adjust LHM to meet specifications
- **System removal**: Remove LHM if correction impossible
- **WMS dimension update**: Correct dimensions in system if measurement error

**WMS Actions**: 
- Dimension correction dialog
- Re-scanning for updated measurements

**Prevention**: Pre-storage dimensional verification

📖 **Reference**: [Main Wiki Section](wiki.md#10006---konturenfehler) | **Original**: stoerungsbehebung.txt:235-248

---

### 10009 - Befristete Annahmesperre

**🟢 Low Priority Temporary Block**

**Problem**: Device manager rejects transport due to temporary acceptance block

**Cause**: Occurs when device reports error and receives another transport order simultaneously

**Diagnostic Steps**:
```
1. Identify primary error causing block
2. Check device error history
3. Verify transport queue status
```

**Solutions**:
- **Primary error resolution**: Resolve underlying device error first
- **Transport retry**: Use "Transport erneut senden" + "Standard" after primary resolution

**WMS Actions**: Standard transport retry

**Prevention**: Proper error handling sequence

📖 **Reference**: [Main Wiki Section](wiki.md#10009---befristete-annahmesperre) | **Original**: stoerungsbehebung.txt:249-266

---

### 10024 - Ziel unerreichbar

**🔴 High Priority Path Blocked**

**Problem**: Destination unreachable due to blocked path or long-term location error

**Blocking Causes**:
- Non-operational device blocking path
- Long-term location error
- Orientation change location inaccessible

**Diagnostic Steps**:
```
1. Identify blocking device/location
2. Check device operational status
3. Verify path calculation
4. Review location error status
```

**Solutions**:
- **Device activation**: Activate/repair blocking device
- **Location error resolution**: Clear long-term location errors
- **Alternative routing**: Find new destination if blockage cannot be cleared

**WMS Actions**:
- "Transport erneut senden" after blockage cleared
- "Neues Ziel suchen" if blockage permanent

**Prevention**: Regular device maintenance and location status review

📖 **Reference**: [Main Wiki Section](wiki.md#10024---ziel-unerreichbar) | **Original**: stoerungsbehebung.txt:269-288

---

### 10039 - Timeout Platzbelegung

**🟡 Medium Priority Sensor Timeout**

**Problem**: No occupancy signal received from conveyor system after timeout

**Sensor Issues**:
- Light sensor misaligned
- Reflective surfaces causing false readings
- Sensor obstruction

**Diagnostic Steps**:
```
1. Check sensor alignment
2. Test sensor response
3. Verify LHM positioning
4. Check for reflective materials
```

**Solutions**:
- **Sensor adjustment**: Realign light sensors/barriers
- **Surface treatment**: Address reflective surfaces
- **Sensor cleaning**: Remove obstructions

**WMS Actions**: "Transport erneut senden" + "Standard" after sensor correction

**Prevention**: Regular sensor maintenance and calibration

📖 **Reference**: [Main Wiki Section](wiki.md#10039---timeout-platzbelegung) | **Original**: stoerungsbehebung.txt:291-307

---

### 10045 - Protokollfehler

**🔴 High Priority Protocol Error**

**Problem**: Device-specific communication protocol error

**Protocol Issues**:
- Incorrect telegram field data
- Inconsistent data transmission
- Missing/unexpected telegrams

**Diagnostic Steps**:
```
1. Review communication logs
2. Check telegram structure
3. Verify protocol implementation
4. Test communication sequence
```

**Solutions**:
- **Protocol reset**: Send "Quit an Gerät senden"
- **Support contact**: Contact Jungheinrich support immediately

**WMS Actions**: "Quit an Gerät senden"

**Prevention**: Protocol compliance verification

📖 **Reference**: [Main Wiki Section](wiki.md#10045---protokollfehler) | **Original**: stoerungsbehebung.txt:310-322

---

### 10053 - Kein Weg modelliert

**🔴 High Priority Configuration Error**

**Problem**: No continuous path modeled between source and destination

**Configuration Issues**:
- Missing path definition
- Incomplete route modeling
- Configuration inconsistency

**Diagnostic Steps**:
```
1. Review transport manager configuration
2. Check path modeling completeness
3. Verify route definitions
4. Test path calculations
```

**Solutions**:
- **Configuration correction**: Fix paths in transport manager
- **System restart**: Restart transport manager
- **Route verification**: Validate all path definitions

**WMS Actions**: "Transport erneut senden" after configuration fix

**Prevention**: Thorough commissioning path verification

📖 **Reference**: [Main Wiki Section](wiki.md#10053---kein-weg-modelliert) | **Original**: stoerungsbehebung.txt:323-336

---

### 20162 - TE-ID ist Null

**🟡 Medium Priority Identification Error**

**Problem**: Transport unit ID (TE-ID) is null due to scanner no-read

**Scanner Issues**:
- Poor label quality
- Scanner misalignment
- Label damage/obstruction

**Diagnostic Steps**:
```
1. Check label quality and positioning
2. Verify scanner alignment
3. Test scanner functionality
4. Review scan history
```

**Solutions**:
- **Label improvement**: Replace/reposition labels
- **Scanner adjustment**: Realign scanner equipment
- **Manual routing**: Route to manual inspection station

**WMS Actions**: "Transport erneut senden" + "LHM anfordern"

**Prevention**: Regular scanner maintenance and label quality control

📖 **Reference**: [Main Wiki Section](wiki.md#20162---te-id-ist-null-no-read) | **Original**: stoerungsbehebung.txt:341-358

---

## Quick Resolution Matrix

| Symptom | Likely Error | First Action | Follow-up |
|---------|--------------|--------------|-----------|
| Device not responding | 10003 | Power cycle device | Check network |
| LHM rejected at entry | 10006 | Check dimensions | Adjust or remove |
| Multiple devices affected | 10024 | Check network/power | Contact IT |
| Sensor false readings | 10039 | Clean/align sensors | Recalibrate |
| Communication garbled | 10045 | Send quit command | Call support |
| Path calculation fails | 10053 | Check configuration | Restart system |
| Scanner not reading | 20162 | Check label quality | Replace/clean |

## Emergency Procedures

### 🚨 Critical System Down
1. **Immediate**: Contact Jungheinrich support
2. **Document**: Record all error codes and symptoms
3. **Isolate**: Prevent further damage
4. **Communicate**: Notify operations team

### 🔧 Maintenance Mode
1. **Safe shutdown**: Complete current transports
2. **Error documentation**: Log all pending errors
3. **Maintenance access**: Provide technician access
4. **Restart procedure**: Follow systematic restart

## Contact Information

- **Technical Support**: Jungheinrich Support
- **Network Issues**: IT Department
- **Emergency**: System Administrator

## Documentation Links

- **Main Wiki**: [wiki.md](wiki.md)
- **Original Document**: [stoerungsbehebung.txt](stoerungsbehebung.txt)
- **System Manual**: Contact support for latest version

---

*Conveyor System Error Guide*  
*Based on Georg Fischer Störungsbehandlung v0.9*  
*Created from stoerungsbehebung.txt*