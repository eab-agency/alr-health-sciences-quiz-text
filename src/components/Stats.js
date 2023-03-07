/* eslint-disable react/no-danger */
function Stats({ stats }) {
    return (
        <section className="stats">
            <ul>
                {stats.map((stat, _index) => (
                    <li key={_index}>
                        <h3>{stat.number}</h3>
                        <h4>{stat.title}</h4>
                        <p
                            dangerouslySetInnerHTML={{
                                __html: stat.description,
                            }}
                        />
                    </li>
                ))}
            </ul>
        </section>
    );
}

export default Stats;
