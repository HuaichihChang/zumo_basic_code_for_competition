// Function to Read Line Sensors to Detect Edge of Dohyo
function read_line (list2: number[]) {
    s = 0
    for (let value of list2) {
        s = s + value
    }
    return s
}
input.buttonD12.onEvent(ButtonEvent.Click, function () {
    zumo.clear()
    zumo.writeStringNewLine("run")
    music.playMelody("B A G A G F A C5 ", 250)
    // Main Body
    while (true) {
        // Read Line Following Sensors to Detect Edge of Dohyo
        sm = read_line(zumo.readLine())
        // Is Robot inside Dohyo?
        if (sm < 500) {
            // Yes Robot is in Dohyo
            // Read Accelerometer to Detect Collision
            collision = read_accel()
            // Collision?
            if (collision < -2 || collision > 2) {
                // Yes Collision Detected
                zumo.writeStringNewLine("Collision!")
                zumo.writeNumNewLine(collision)
                while (true) {
                    pushHard()
                    // Run Motor at High Speed
                    zumo.runMotor(ZumoMotor.All, 100)
                    pause(50)
                    // Read Line Sensor
                    sm = read_line(zumo.readLine())
                    if (sm >= 500) {
                        // Edge Detected STOP and go Back to Normal Speed
                        break;
                    }
                }
            } else {
                // No Collision Proceed at Normal Speed
                zumo.runMotor(ZumoMotor.All, 99)
                pause(50)
            }
        } else {
            // Edge of Dohyo Detected, Stop and Turn Around
            zumo.stopMotor(ZumoMotor.All)
            pause(200)
            zumo.runMotor(ZumoMotor.All, -99)
            pause(1000)
            zumo.TurnDirection(ZumoMotor.right, 99)
            pause(1000)
        }
    }
})
// Function to Read Accelerometer to Determine Collision
function read_accel () {
    x_axis = 0
    x_axis = zumo.readIMU(ZumoIMUMode.ACC, ZumoIMUDirection.X)
    return x_axis
}
function pushHard () {
    pins.D9.digitalWrite(true)
    pins.D10.digitalWrite(true)
    pause(500)
    pins.D9.digitalWrite(false)
    pins.D10.digitalWrite(false)
}
let x_axis = 0
let collision = 0
let sm = 0
let s = 0
// Initialization Code (**DO NOT MODIFY**)
zumo.createI2C(pins.SCL, pins.SDA)
zumo.init(128, 64)
zumo.enableIMU()
zumo.Initialization(Lightype.DIGITAL)
zumo.writeStringNewLine("ready ...")
zumo.writeStringNewLine(zumo.readString(zumo.calibratedMinimumOn_values()))
zumo.writeStringNewLine(zumo.readString(zumo.calibratedMaximumOn_values()))
zumo.writeStringNewLine(zumo.readString(zumo.readLine()))
