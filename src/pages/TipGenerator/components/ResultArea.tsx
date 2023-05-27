import React, { useContext, useMemo } from "react";
import styles from '../index.module.css';
import { BillContext } from "..";

interface ResultProps {
}

const ResultArea: React.FC<ResultProps> = () => {

    const context = useContext(BillContext);

    const tipAmt = useMemo(() => {
        if(context?.inputState){
            const { bill, person, tip } = context.inputState;
            if(bill && person){
                console.log('bill: ', bill, ' person: ', person, ' tip: ', tip);
                const tipVal = bill * (tip / 100)
                return (tipVal / person).toFixed(2);
            } else {
                return 0;
            }
        }
        return null;
    }, [context]);

    const totalAmt = useMemo(() => {
        if (context?.inputState) {
            const { bill, person, tip } = context.inputState;
            if (bill && person) {
            const total = bill + (bill * (tip / 100))
            return (total/person).toFixed(2);
            } else {
                return 0;
            }
        }
        return null;
    }, [context]);

    const handleReset = () => {
        context?.updateInput?.({ type: "reset", value: 0 })
    }

    return(
        <>
            <div className={styles.resultArea}>
                <div>
                    <div className={`my-2 ${styles.field}`}>
                        <div className={styles.fieldLabel}>
                            <p className="mb-0"> Tip Amount </p>
                            <span> / person </span>
                        </div>
                        <div className="fs-2">
                            {tipAmt ? (
                                `$${tipAmt}`
                            ): (
                                '$0.00'
                            )}
                        </div>
                    </div>
                    <div className={`mt-3 ${styles.field}`}>
                        <div className={styles.fieldLabel}>
                            <p className="mb-0"> Total </p>
                            <span> / person </span>
                        </div>
                        <div className="fs-2">
                            {totalAmt ? (
                                `$${totalAmt}`
                            ) : (
                                '$0.00'
                            )}
                        </div>
                    </div>
                </div>
                <div>
                    {Boolean(tipAmt) && Boolean(totalAmt) && (
                        <button onClick={handleReset} type="button" title="Reset All Values" className={`w-100 py-2 ${styles.resetBtn}`}>
                            RESET
                        </button>
                    )}
                </div>
            </div>
        </>
    )
}

export default ResultArea;