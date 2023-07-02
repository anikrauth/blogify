
export default function HorizontalAd (props: any){
    const {classNames} = props;
    return(
        <div className={`horizontalAd_wraper  ${classNames} m-auto flex justify-center  items-center dark:bg-dark_header_color bg-white_color`}>
            <p>Advertisement(728x90)</p>
        </div>
    )
}