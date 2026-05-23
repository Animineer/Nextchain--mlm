import {
  ChevronDown,
  User2,
} from "lucide-react";

/*
Recursive Tree Node
*/
const ReferralNode = ({ node }) => {
  return (
    <div className="flex flex-col items-center">
      {/* Node Card */}
      <div
        className="
          relative
          min-w-[180px]
          rounded-2xl
          border
          border-slate-800
          bg-slate-900/80
          px-5
          py-4
          shadow-xl
          backdrop-blur-sm
          transition-all
          duration-300
          hover:border-cyan-500/40
          hover:shadow-cyan-500/10
        "
      >
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div
            className="
              h-12
              w-12
              rounded-xl
              bg-cyan-500/10
              border
              border-cyan-500/20
              flex
              items-center
              justify-center
            "
          >
            <User2
              className="text-cyan-400"
              size={20}
            />
          </div>

          {/* User Info */}
          <div>
            <h3 className="text-white font-semibold">
              {node.name}
            </h3>

            <p className="text-xs text-slate-400">
              Referral Member
            </p>
          </div>
        </div>
      </div>

      {/* Children */}
      {node.children &&
        node.children.length > 0 && (
          <>
            {/* Vertical Connector */}
            <div className="w-px h-8 bg-slate-700"></div>

            {/* Down Icon */}
            <div className="h-8 w-8 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center mb-6">
              <ChevronDown
                className="text-cyan-400"
                size={16}
              />
            </div>

            {/* Horizontal Tree */}
            <div className="relative flex items-start justify-center gap-10">
              {/* Horizontal Line */}
              <div className="absolute top-0 left-0 right-0 h-px bg-slate-700"></div>

              {node.children.map((child) => (
                <div
                  key={child.id}
                  className="relative pt-8 flex flex-col items-center"
                >
                  {/* Vertical Line */}
                  <div className="absolute top-0 w-px h-8 bg-slate-700"></div>

                  <ReferralNode
                    node={child}
                  />
                </div>
              ))}
            </div>
          </>
        )}
    </div>
  );
};

const ReferralTree = ({ tree }) => {
  return (
    <div className="w-full overflow-x-auto py-6">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white">
          Referral Network
        </h2>

        <p className="text-slate-400 text-sm mt-2">
          Visual hierarchy of your referral
          structure and network growth.
        </p>
      </div>

      {/* Tree Container */}
      <div className="min-w-max flex justify-center">
        <div className="flex gap-16">
          {tree.map((node) => (
            <ReferralNode
              key={node.id}
              node={node}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReferralTree;