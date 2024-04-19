def on_button_d12_click():
    global sm
    zumo.clear()
    zumo.write_string_new_line("run")
    music.play_melody("B A G A G F A C5 ", 250)
    while True:
        sm = sum2(zumo.read_line())
        zumo.write_num_new_line(sm)
        if sm < 500:
            zumo.run_motor(ZumoMotor.ALL, 99)
            pause(50)
        else:
            zumo.stop_motor(ZumoMotor.ALL)
            pause(200)
            zumo.run_motor(ZumoMotor.ALL, -99)
            pause(1000)
            zumo.turn_direction(ZumoMotor.RIGHT, 99)
            pause(1000)
input.button_d12.on_event(ButtonEvent.CLICK, on_button_d12_click)

def sum2(list2: List[number]):
    global s
    s = 0
    for value in list2:
        s = s + value
    return s
s = 0
sm = 0
zumo.create_i2c(pins.SCL, pins.SDA)
zumo.init(128, 64)
zumo.enable_imu()
zumo.initialization(Lightype.DIGITAL)
zumo.write_string_new_line("readyx")
zumo.write_string_new_line(zumo.read_string(zumo.calibratedMinimumOn_values()))
zumo.write_string_new_line(zumo.read_string(zumo.calibratedMaximumOn_values()))
zumo.write_string_new_line(zumo.showerr())
zumo.write_string_new_line(zumo.read_string(zumo.read_line()))