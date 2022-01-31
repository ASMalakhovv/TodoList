import {Button} from "@material-ui/core";


export type ButtonPropsType = {
    callback: () => void
    name: string
    filter?: string
}

export function ButtonMy(props: ButtonPropsType) {
    const onClickHandler = () => {
        props.callback()
    }
    return (
        <Button onClick={onClickHandler}
                color={props.filter === props.name ? "secondary" : "primary"}
                variant={props.filter === props.name ? "contained" : "text"}
                size={'small'}
                >
            {props.name}
        </Button>
    )
}