import React from "react";
import styles from './rulesDialog.module.css';
import basicRules from '../../../images/rockPaperGame/image-rules.svg';

export interface RulesDialogProps{
    setOpen: React.Dispatch<React.SetStateAction<boolean>>,
    open: boolean;
};

const RulesDialog:React.FC<RulesDialogProps> = (props) => {

    const {open, setOpen} = props;

    if(open){
        return (
            <div className={`modal fade modal-dialog-centered justify-content-center show ${styles.rules_wrapper}`} tabIndex={-1} aria-modal={ "true" } role ="dialog" id ="modal" >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header border-bottom-0">
                            <h5 className={`modal-title ${styles.rules_text}`}> RULES </h5>
                            <button type="button" className="btn-close" onClick={() => setOpen(false)} aria-label="Close"></button>
                        </div>
                        <div className="modal-body text-center">
                            <img className={styles.tri_rules_img} src={basicRules} alt={'rules'} />
                        </div>
                    </div>
                </div>
        </div>
        )
    }

    return null;
}

export default RulesDialog;