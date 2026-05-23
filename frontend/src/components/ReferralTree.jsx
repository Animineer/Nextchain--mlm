/*
Recursive component
*/

const ReferralNode = ({ node }) => {
  return (
    <li>
      {node.name}

      {node.children.length > 0 && (
        <ul>
          {node.children.map((child) => (
            <ReferralNode
              key={child.id}
              node={child}
            />
          ))}
        </ul>
      )}
    </li>
  );
};

const ReferralTree = ({ tree }) => {
  return (
    <div>
      <h3>Referral Tree</h3>

      <ul>
        {tree.map((node) => (
          <ReferralNode
            key={node.id}
            node={node}
          />
        ))}
      </ul>
    </div>
  );
};

export default ReferralTree;