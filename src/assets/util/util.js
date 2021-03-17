
export function computedBalanceDate (date){
    let target = new Date(date).getTime()
    let now = new Date().getTime()
    let runTime = target - now
    let year = Math.floor(runTime / (365 * 24 * 60 * 60 * 1000))
    runTime = runTime % (365 * 24 * 60 * 60 * 1000)
    let month = Math.floor(runTime / (30 * 24 * 60 * 60 * 1000))
    runTime = runTime % (30 * 24 * 60 * 60 * 1000)
    let day = Math.floor(runTime / 86400);
    runTime = runTime % 86400;
    let hour = Math.floor(runTime / 3600);
    runTime = runTime % 3600;
    let minute = Math.floor(runTime / 60);
    runTime = runTime % 60;
    let second = runTime;
    return `${year}年${month}月${day}天`
}