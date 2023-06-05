class TimeConversion {

    public static ConvertToUnix(d : Date): number {
        return Math.floor(d.getTime() / 1000);
    }

}

export default TimeConversion;