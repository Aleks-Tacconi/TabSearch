import Tab from "./Tab";

export default function TabList({ tabs }) {
    return (
        <>
            {
                tabs.map((tab) => (
                    <Tab key={tab.id} tab={tab} />
                ))
            }
        </>
    );
}
