import BorrowalStatus from "../entities/borrowal-status";

export class BorrowalStatusEnum {
    public static Borrowed = status(0);
    public static Returned = status(1);
}


function status(state:number): BorrowalStatus {
    const borrowedStatus = new BorrowalStatus();
    borrowedStatus.id = state;
    return borrowedStatus;
}



export default BorrowalStatus;